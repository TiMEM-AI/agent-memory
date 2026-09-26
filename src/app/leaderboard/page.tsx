import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Gauge, ListOrdered, ShieldCheck, Trophy, Users } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import LeaderboardTables from '@/components/leaderboard/LeaderboardTables'
import amlData from '@/data/aml_leaderboard.json'

const SITE_URL = 'https://agent-memory.cn'

export const metadata: Metadata = {
  title: '外部榜单对标 | Agent Memory Leaderboard（AML）文本/代码赛道成绩',
  description:
    '收录天津大学等 27 家机构联合运营的 Agent Memory Leaderboard（agentmemories.ai）公开榜单数据：Textual 与 Coding 赛道 Cycle 1 完整排名，并对照本站评测的 Mem0、Supermemory、Tencent Agent Memory、MemoryBear 等引擎的位次。',
  keywords: [
    'Agent Memory Leaderboard', 'AML 榜单', 'agentmemories.ai', '记忆引擎榜单',
    'Mem0 排名', 'Cognee', 'MemoraX', 'MemOS 评测', '记忆智能体评测', 'memory benchmark',
  ],
  alternates: {
    canonical: '/leaderboard/',
  },
  openGraph: {
    title: '外部榜单对标 | Agent Memory Leaderboard（AML）',
    description:
      'AML 文本/代码赛道 Cycle 1 完整排名快照，对照本站 14 款记忆引擎评测，看清你关注的引擎在统一协议评测中的位置。',
    url: `${SITE_URL}/leaderboard/`,
    siteName: 'Agent Memory',
    locale: 'zh_CN',
    type: 'article',
  },
}

const source = amlData.source as {
  url: string
  githubUrl: string
  huggingfaceUrl: string
  orgNote: string
  cycle: string
  published: string
  snapshotDate: string
  methodology: string[]
}

const matches = amlData.matches as {
  engineId: string
  engineName: string
  note: string
  entries: { track: string; division: string; rank: number; overall: string; model?: string }[]
}[]

const notable = amlData.notable as { model: string; why: string }[]

const trackLabel: Record<string, string> = {
  textual: '文本赛道',
  coding: '代码赛道',
}
const divisionLabel: Record<string, string> = {
  industry: '商业产品组',
  academy: '开源方法组',
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-paper texture-paper">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-ink-light mb-4">
              <Trophy className="h-3.5 w-3.5 text-gold" />
              外部榜单 · 数据快照 {source.snapshotDate}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink-deep mb-4">
              Agent Memory Leaderboard 对标
            </h1>
            <p className="text-ink-light text-lg max-w-3xl mx-auto">
              AML 是由 {source.orgNote} 的智能体记忆公开评测：参赛系统自托管
              Add / Search，平台统一执行 Answer 与 Eval。这里收录其 Textual 与 Coding
              赛道 Cycle 1 的完整排名，并对照本站评测的引擎位次。
            </p>
          </div>

          {/* Key facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: ListOrdered, title: source.cycle, sub: `2026-08-12 发布 · Cycle 2 文本赛道 2026-10-31 截止` },
              { icon: Users, title: '27 家机构', sub: '天津大学牵头，含上海AI实验室、牛津、NTU 等' },
              { icon: Gauge, title: '3 条赛道', sub: '文本（已发布）· 代码（已发布）· 多模态（未发布）' },
              { icon: ShieldCheck, title: '统一协议', sub: '答案模型 / 评测器 / Top-K=100 全部平台锁定' },
            ].map((f) => (
              <div key={f.title} className="glass rounded-2xl p-5 shadow-card">
                <f.icon className="h-5 w-5 text-gold mb-3" />
                <div className="font-serif text-lg font-semibold text-ink-deep">{f.title}</div>
                <div className="text-xs text-ink-light mt-1 leading-relaxed">{f.sub}</div>
              </div>
            ))}
          </div>

          {/* Methodology */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-deep mb-6">
              评测方法要点
            </h2>
            <ul className="glass rounded-2xl p-6 shadow-card space-y-3">
              {source.methodology.map((m) => (
                <li key={m} className="flex gap-3 text-sm text-ink leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 本站引擎位次 */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-deep mb-2">
              本站收录引擎的榜单位次
            </h2>
            <p className="text-ink-light text-sm mb-6">
              14 款引擎中有 4 款出现在 Cycle 1 榜单；位次按榜单原文收录，点击引擎名查看本站深度评测。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {matches.map((m) => (
                <div key={m.engineId} className="glass rounded-2xl p-5 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <Link
                      href={`/engines/${m.engineId}/`}
                      className="font-serif text-lg font-semibold text-ink-deep hover:text-gold transition-colors"
                    >
                      {m.engineName}
                    </Link>
                    <span className="text-xs text-ink-light">{m.entries.length} 次上榜</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {m.entries.map((e) => (
                      <span
                        key={`${e.track}-${e.division}-${e.rank}`}
                        className="rounded-lg bg-ink-deep/5 px-2.5 py-1 text-xs text-ink"
                      >
                        {trackLabel[e.track]} · {divisionLabel[e.division]} ·
                        <span className="font-mono font-semibold text-gold"> №{e.rank}</span>
                        <span className="font-mono"> {e.overall}</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-ink-light leading-relaxed">{m.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 榜上新面孔 */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-deep mb-2">
              榜单上值得关注的竞品
            </h2>
            <p className="text-ink-light text-sm mb-6">
              Cycle 1 出现了一批本站尚未收录的强势选手，后续评测会逐步覆盖。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {notable.map((n) => (
                <div key={n.model} className="glass rounded-2xl p-5 shadow-card">
                  <div className="font-serif text-lg font-semibold text-ink-deep mb-2">{n.model}</div>
                  <p className="text-sm text-ink leading-relaxed">{n.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Полные таблицы */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-deep mb-2">
              完整榜单快照
            </h2>
            <p className="text-ink-light text-sm mb-6">
              金色高亮为本站已收录引擎。表头 A–H 对应 Textual 赛道七个能力维度。
            </p>
            <LeaderboardTables />
          </section>

          {/* 定位说明 + 链接 */}
          <section className="glass rounded-2xl p-6 shadow-card">
            <h2 className="font-serif text-xl font-bold text-ink-deep mb-3">
              这个榜单与本站评测的关系
            </h2>
            <p className="text-sm text-ink leading-relaxed mb-4">
              AML 用统一协议量化记忆系统"能力上限"，本站评测覆盖架构设计、成本效益、开发体验与场景适配等
              "选型维度"，两者互补：先看榜单确认能力水位，再结合本站对比选择工程上合适的方案。
              AML 正在举办 Cycle 2（文本赛道 2026-10-31 截止，新增 Streaming 持续记忆），
              届时本页将同步更新快照。
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                className="inline-flex items-center gap-1.5 rounded-xl bg-ink-deep px-4 py-2 text-paper hover:opacity-90 transition-opacity"
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                官方榜单 <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-ink hover:bg-ink-deep/5 transition-colors"
                href={source.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-ink hover:bg-ink-deep/5 transition-colors"
                href={source.huggingfaceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hugging Face <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-ink hover:bg-ink-deep/5 transition-colors"
                href="/evaluate/"
              >
                本站评测对比
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
