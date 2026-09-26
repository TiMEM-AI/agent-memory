---
name: site-monitor
description: Мониторинг доступности и SEO-здоровья продакшн-сайта agent-memory.cn (GitHub Pages). Use when checking that the deployed site is up, pages respond fast, meta tags / sitemap / robots.txt are correct, or when diagnosing "сайт не открывается / пропал из поиска". Runs a dependency-free Python checker against production URLs and reports failures with exit code 1.
---

# Site Monitor (agent-memory.cn)

Проверяет продакшн-сайт и его SEO-инфраструктуру без внешних зависимостей (только stdlib Python 3.9+).

## Когда использовать

- После деплоя на GitHub Pages — убедиться, что новые страницы отдаются и мета-теги на месте.
- Периодическая проверка: сайт жив, sitemap валиден, все URL из sitemap отвечают 200.
- Диагностика: пользователь сообщает, что страница не открывается / в поиске старый сниппет.

## Запуск

```bash
# Полная проверка (конфиг: site-monitor.json рядом со скриптом)
python3 .zcode/skills/site-monitor/scripts/check_site.py

# Другой конфиг / быстрый прогон
python3 .zcode/skills/site-monitor/scripts/check_site.py --config <path-to.json>

# Машинночитаемый итог (для дальнейшей обработки)
python3 .zcode/skills/site-monitor/scripts/check_site.py --json

# Только ошибки (без OK-строк)
python3 .zcode/skills/site-monitor/scripts/check_site.py --only-errors

# Изменить таймаут запроса (сек)
python3 .zcode/skills/site-monitor/scripts/check_site.py --timeout 20
```

Exit code: `0` — всё в порядке; `1` — есть ошибки (сайт лежит, 404, нет title/description, битая ссылка в sitemap).

## Что проверяется

1. **Доступность** каждой страницы из конфига: HTTP 200, время ответа, размер, redirect-цепочка (запись в отчёт, если редирект не на https-канонический домен).
2. **SEO-мета** для HTML-страниц: наличие `<title>`, `meta description`, `link rel=canonical`, `og:title`; предупреждение, если description короче 50 или длиннее 320 символов.
3. **robots.txt** — отвечает 200 и содержит строку `Sitemap:`.
4. **sitemap.xml** — валиден, каждый `<loc>` проверяется повторным запросом (все URL должны отдавать 200).
5. **Контентный маркер**: у страниц может быть задан `expect` — текст, который обязан встречаться в HTML (ловит «страница отдаётся, но пустая»).

## Конфиг (site-monitor.json)

```json
{
  "targets": [
    { "url": "https://agent-memory.cn/", "expect": "记忆引擎" },
    { "url": "https://agent-memory.cn/leaderboard/", "expect": "Agent Memory Leaderboard" },
    { "url": "https://agent-memory.cn/sitemap.xml", "sitemap": true },
    { "url": "https://agent-memory.cn/robots.txt", "robots": true }
  ],
  "timeout": 15
}
```

- `expect` — необязательный маркер контента.
- `sitemap: true` — проверять как sitemap и дополнительно пройтись по всем `<loc>`.
- `robots: true` — проверять как robots.txt.
- Зеркало GitHub Pages добавляйте вторым таргетом, если канонический домен подозревают в проблемах.

## Как обновлять

- Добавили новую страницу сайта → добавьте её URL (с `expect`) в `site-monitor.json` и в `src/app/sitemap.ts`, затем запустите проверку.
- Отчёт не пишется в репозиторий — только в stdout; для CI используйте GitHub Actions workflow `.github/workflows/site-monitor.yml` (запускается по расписанию и вручную).

## Известные ограничения

- Канонический прод сейчас — GitHub Pages `https://timem-ai.github.io/agent-memory/`.
  Кастомный домен `agent-memory.cn` прописан в конфиге как `optional`-таргет: пока DNS
  не настроен, его падение даёт WARN, а не FAIL. После привязки домена перенесите его
  в основные таргеты.
- Скрипт не исполняет JavaScript: подходит для статического экспорта Next.js (этот сайт), но не для CSR-приложений.
- Проверка индексации в поисковых системах (site: / Search Console) вручную — скрипт проверяет только техническую сторону SEO.
