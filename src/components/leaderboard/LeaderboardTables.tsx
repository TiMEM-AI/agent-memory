'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import amlData from '@/data/aml_leaderboard.json'

const source = amlData.source as {
  url: string
  textualUrl: string
  codingUrl: string
  snapshotDate: string
}

const capabilities = amlData.capabilities as {
  key: string
  label: string
  letter: string
}[]

type TextualRow = {
  rank: number
  model: string
  overall: string
  factRecall: string
  inference: string
  temporal: string
  governance: string
  personalization: string
  contextExecution: string
  safetyPrivacy: string
}

type CodingRow = {
  rank: number
  model: string
  version: string
  status: string
  overall: string
  newFeature: string
  bugFix: string
  inputTokens: string
  outputTokens: string
  returnSize: string
  writeTime: string
  searchTime: string
  totalTime: string
}

const tracks = amlData.tracks as unknown as {
  textual: { industry: TextualRow[]; academy: TextualRow[] }
  coding: { industry: CodingRow[]; academy: CodingRow[] }
}

// 本站已收录引擎在榜单中的名称前缀（用于高亮行）
const highlightPrefixes = ['mem0', 'tencentdb', 'supermemory', 'memorybear']

function isOurs(model: string) {
  const m = model.toLowerCase()
  return highlightPrefixes.some((p) => m.startsWith(p))
}

type TabKey = 'textual-industry' | 'textual-academy' | 'coding-industry' | 'coding-academy'

const tabs: { key: TabKey; label: string; sub: string }[] = [
  { key: 'textual-industry', label: '文本 · 商业产品', sub: 'I 组 · 15 个系统' },
  { key: 'textual-academy', label: '文本 · 开源方法', sub: 'A 组 · 50 个系统' },
  { key: 'coding-industry', label: '代码 · 商业产品', sub: 'I 组 · 15 个系统' },
  { key: 'coding-academy', label: '代码 · 开源方法', sub: 'A 组 · 43 个系统' },
]

function TextualTable({ rows }: { rows: TextualRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-deep/10">
      <table className="w-full min-w-[860px] text-sm">
        <thead>
          <tr className="bg-ink-deep/5 text-left text-xs uppercase tracking-wide text-ink-light">
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">系统</th>
            <th className="px-3 py-3 text-gold">Overall</th>
            {capabilities.map((c) => (
              <th key={c.key} className="px-3 py-3" title={c.label}>
                {c.letter}
                <span className="ml-1 hidden xl:inline normal-case">{c.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const ours = isOurs(row.model)
            return (
              <tr
                key={`${row.rank}-${row.model}`}
                className={`border-t border-ink-deep/5 ${ours ? 'bg-gold/10' : 'hover:bg-ink-deep/[0.03]'}`}
              >
                <td className="px-3 py-2.5 font-mono text-ink-light">{row.rank}</td>
                <td className="px-3 py-2.5 font-medium text-ink-deep">
                  {row.model}
                  {ours && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs text-ink-deep">
                      本站收录
                    </span>
                  )}
                </td>
                <td className="px-3 py-2.5 font-mono font-semibold text-gold">{row.overall}</td>
                {capabilities.map((c) => (
                  <td key={c.key} className="px-3 py-2.5 font-mono text-ink">
                    {(row as unknown as Record<string, string>)[c.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CodingTable({ rows }: { rows: CodingRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-deep/10">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="bg-ink-deep/5 text-left text-xs uppercase tracking-wide text-ink-light">
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">系统</th>
            <th className="px-3 py-3 text-gold">综合解决率</th>
            <th className="px-3 py-3">新功能</th>
            <th className="px-3 py-3">缺陷修复</th>
            <th className="px-3 py-3">输入 Token</th>
            <th className="px-3 py-3">输出 Token</th>
            <th className="px-3 py-3">返回体量</th>
            <th className="px-3 py-3">写入</th>
            <th className="px-3 py-3">检索</th>
            <th className="px-3 py-3">总耗时</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const ours = isOurs(row.model)
            return (
              <tr
                key={`${row.rank}-${row.model}`}
                className={`border-t border-ink-deep/5 ${ours ? 'bg-gold/10' : 'hover:bg-ink-deep/[0.03]'}`}
              >
                <td className="px-3 py-2.5 font-mono text-ink-light">{row.rank}</td>
                <td className="px-3 py-2.5 font-medium text-ink-deep">
                  {row.model}
                  {row.version && <span className="ml-1 text-xs text-ink-light">{row.version}</span>}
                  {ours && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs text-ink-deep">
                      本站收录
                    </span>
                  )}
                  <span className="ml-2 text-xs text-ink-light">{row.status}</span>
                </td>
                <td className="px-3 py-2.5 font-mono font-semibold text-gold">{row.overall}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.newFeature}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.bugFix}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.inputTokens}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.outputTokens}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.returnSize}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.writeTime}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.searchTime}</td>
                <td className="px-3 py-2.5 font-mono text-ink">{row.totalTime}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function LeaderboardTables() {
  const [tab, setTab] = useState<TabKey>('textual-industry')

  return (
    <div>
      {/* Треки / таблицы */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-xl px-4 py-2.5 text-left transition-all ${
              tab === t.key
                ? 'bg-ink-deep text-paper shadow-card'
                : 'glass text-ink hover:bg-ink-deep/5'
            }`}
          >
            <span className="block text-sm font-medium">{t.label}</span>
            <span className={`block text-xs ${tab === t.key ? 'text-paper/70' : 'text-ink-light'}`}>
              {t.sub}
            </span>
          </button>
        ))}
        <span className="rounded-xl border border-dashed border-ink-deep/20 px-4 py-2.5 text-sm text-ink-light">
          多模态赛道 · 结果未发布
        </span>
      </div>

      {tab.startsWith('textual') ? (
        <TextualTable rows={tracks.textual[tab.endsWith('industry') ? 'industry' : 'academy']} />
      ) : (
        <CodingTable rows={tracks.coding[tab.endsWith('industry') ? 'industry' : 'academy']} />
      )}

      <div className="mt-4 flex flex-col gap-1 text-xs text-ink-light">
        <span>
          数据快照：AML Cycle 1（2026-08-12 发布），快照时间 {source.snapshotDate}。分数与排名以
          agentmemories.ai 实时榜单为准。
        </span>
        <span>
          三赛道指标维度不同，分数不可跨赛道比较；开源方法组在 Add 阶段固定使用 gpt-4o-mini。
        </span>
        <a
          className="inline-flex items-center gap-1 text-gold hover:underline"
          href={tab.startsWith('textual') ? source.textualUrl : source.codingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          查看官方榜单 <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
