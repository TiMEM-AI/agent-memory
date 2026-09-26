#!/usr/bin/env python3
"""Site monitor for agent-memory.cn: availability + basic SEO checks.

Dependency-free (stdlib only). Exit code 1 when any check fails.
Usage: check_site.py [--config PATH] [--json] [--only-errors] [--timeout SECONDS]
"""

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

DEFAULT_CONFIG = Path(__file__).resolve().parent.parent / "site-monitor.json"

META_PATTERNS = {
    "title": re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL),
    "description": re.compile(
        r"<meta[^>]+name=[\"']description[\"'][^>]*content=[\"']([^\"']*)[\"']", re.IGNORECASE
    ),
    "canonical": re.compile(
        r"<link[^>]+rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']*)[\"']", re.IGNORECASE
    ),
    "og:title": re.compile(
        r"<meta[^>]+property=[\"']og:title[\"'][^>]*content=[\"']([^\"']*)[\"']", re.IGNORECASE
    ),
}


def fetch(url: str, timeout: int):
    req = urllib.request.Request(url, headers={"User-Agent": "site-monitor/1.0 (+agent-memory.cn)"})
    started = time.monotonic()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read()
            return {
                "ok": True,
                "status": resp.status,
                "final_url": resp.geturl(),
                "latency_ms": int((time.monotonic() - started) * 1000),
                "bytes": len(body),
                "body": body.decode("utf-8", errors="replace"),
                "error": None,
            }
    except urllib.error.HTTPError as e:
        return {"ok": False, "status": e.code, "final_url": url, "latency_ms": None,
                "bytes": 0, "body": "", "error": f"HTTP {e.code}"}
    except Exception as e:  # noqa: BLE001 - report any network failure
        return {"ok": False, "status": None, "final_url": url, "latency_ms": None,
                "bytes": 0, "body": "", "error": str(e)}


def check_page(target: dict, timeout: int):
    results = []
    url = target["url"]
    r = fetch(url, timeout)
    base = {"url": url}
    if not r["ok"]:
        results.append({**base, "level": "error", "check": "http", "detail": r["error"]})
        return results, r["body"]

    redirect_note = ""
    if r["final_url"] != url:
        redirect_note = f" (redirect -> {r['final_url']})"
        if r["final_url"].startswith("http://"):
            results.append({**base, "level": "error", "check": "https",
                            "detail": f"redirect to insecure {r['final_url']}"})
    results.append({**base, "level": "ok", "check": "http",
                    "detail": f"{r['status']} in {r['latency_ms']}ms, {r['bytes']} bytes{redirect_note}"})

    if r["latency_ms"] and r["latency_ms"] > 5000:
        results.append({**base, "level": "warning", "check": "latency",
                        "detail": f"slow response: {r['latency_ms']}ms"})

    ctype_html = "text/html" in r.get("final_url", "") or r["body"].lstrip().lower().startswith(("<!doctype html", "<html"))
    if not ctype_html and "<html" not in r["body"][:2000].lower():
        return results, r["body"]

    for name, pat in META_PATTERNS.items():
        m = pat.search(r["body"])
        if not m or not (m.group(1) or "").strip():
            results.append({**base, "level": "error", "check": f"meta:{name}", "detail": "missing"})
        else:
            value = (m.group(1) or "").strip()
            detail = f'"{value[:80]}"'
            if name == "description" and not 50 <= len(value) <= 320:
                detail += f" ({len(value)} chars, recommended 50-320)"
            results.append({**base, "level": "ok", "check": f"meta:{name}", "detail": detail})

    expect = target.get("expect")
    if expect and expect not in r["body"]:
        results.append({**base, "level": "error", "check": "content",
                        "detail": f"expected marker not found: {expect!r}"})
    return results, r["body"]


def check_sitemap(url: str, timeout: int):
    results = []
    r = fetch(url, timeout)
    base = {"url": url}
    if not r["ok"]:
        return [{**base, "level": "error", "check": "sitemap", "detail": r["error"]}]
    results.append({**base, "level": "ok", "check": "sitemap",
                    "detail": f"{r['status']} in {r['latency_ms']}ms"})
    try:
        root = ET.fromstring(r["body"])
    except ET.ParseError as e:
        return results + [{**base, "level": "error", "check": "sitemap:parse", "detail": str(e)}]
    locs = [el.text.strip() for el in root.iter() if el.tag.rsplit("}", 1)[-1] == "loc"]
    if not locs:
        return results + [{**base, "level": "error", "check": "sitemap:empty", "detail": "no <loc> entries"}]
    results.append({**base, "level": "ok", "check": "sitemap:entries", "detail": f"{len(locs)} URLs"})
    bad = []
    for loc in locs:
        sub = fetch(loc, timeout)
        if not sub["ok"]:
            bad.append(f"{loc}: {sub['error']}")
    if bad:
        results.append({**base, "level": "error", "check": "sitemap:urls",
                        "detail": f"{len(bad)} broken: " + "; ".join(bad[:5])})
    else:
        results.append({**base, "level": "ok", "check": "sitemap:urls", "detail": "all return 200"})
    return results


def check_robots(url: str, timeout: int):
    results = []
    r = fetch(url, timeout)
    base = {"url": url}
    if not r["ok"]:
        return [{**base, "level": "error", "check": "robots", "detail": r["error"]}]
    results.append({**base, "level": "ok", "check": "robots", "detail": f"{r['status']} in {r['latency_ms']}ms"})
    if not re.search(r"(?im)^\s*sitemap\s*:", r["body"]):
        results.append({**base, "level": "error", "check": "robots:sitemap-directive",
                        "detail": "no 'Sitemap:' line"})
    else:
        results.append({**base, "level": "ok", "check": "robots:sitemap-directive", "detail": "found"})
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", default=str(DEFAULT_CONFIG))
    parser.add_argument("--json", action="store_true", dest="as_json")
    parser.add_argument("--only-errors", action="store_true")
    parser.add_argument("--timeout", type=int, default=None)
    args = parser.parse_args()

    config = json.loads(Path(args.config).read_text(encoding="utf-8"))
    timeout = args.timeout or config.get("timeout", 15)
    targets = config["targets"]

    all_results = []
    for target in targets:
        optional = bool(target.get("optional"))
        group = []
        if target.get("sitemap"):
            group = check_sitemap(target["url"], timeout)
        elif target.get("robots"):
            group = check_robots(target["url"], timeout)
        else:
            group, _ = check_page(target, timeout)
        if optional:
            for r in group:
                if r["level"] == "error":
                    r["level"] = "warning"
                    r["detail"] = f"[optional target] {r['detail']}"
        all_results.extend(group)

    failed = [r for r in all_results if r["level"] == "error"]
    shown = [r for r in all_results if not args.only_errors or r["level"] != "ok"]

    if args.as_json:
        print(json.dumps({"failed": len(failed), "results": all_results},
                         ensure_ascii=False, indent=2))
    else:
        for r in shown:
            mark = {"ok": " OK ", "warning": "WARN", "error": "FAIL"}[r["level"]]
            print(f"[{mark}] {r['url']} :: {r['check']} :: {r['detail']}")
        summary = f"{len(all_results) - len(failed)}/{len(all_results)} checks passed"
        print(f"\n{summary}; {len(failed)} error(s)")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
