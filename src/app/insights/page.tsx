'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const insights = [
  {
    slug: 'memory-architecture-battle',
    title: '记忆的架构之战：图谱 vs 层级 vs 向量',
    excerpt: '深入解析四种记忆范式的核心差异，从向量检索到知识图谱，从操作系统启发到人脑模拟，找到最适合你的架构方案。',
    category: '架构分析',
    readTime: '12分钟',
    date: '2026-06-15',
    featured: true,
  },
  {
    slug: 'mem0-deep-dive',
    title: 'Mem0 评测：最接近量产的解决方案',
    excerpt: '从集成体验到性能表现，从成本效益到实际应用场景，全面解析这款最受开发者欢迎的记忆引擎。',
    category: '深度评测',
    readTime: '10分钟',
    date: '2026-06-10',
    featured: false,
  },
  {
    slug: 'why-ai-needs-memory',
    title: '为什么你的 AI 应用需要记忆系统',
    excerpt: '从上下文窗口限制到多会话一致性，从用户画像到个性化体验，探讨记忆层如何让 AI 真正理解用户。',
    category: '选型指南',
    readTime: '8分钟',
    date: '2026-06-05',
    featured: false,
  },
  {
    slug: 'memgpt-analysis',
    title: 'MemGPT 技术解析：类操作系统内存管理',
    excerpt: 'Berkeley 研究的核心理念如何突破上下文限制，MemGPT 的分页机制与自主记忆调度详解。',
    category: '技术解析',
    readTime: '15分钟',
    date: '2026-05-28',
    featured: false,
  },
  {
    slug: 'timem-temporal-hierarchy',
    title: 'TiMem 时间层级记忆：像人脑一样思考',
    excerpt: '从碎片记忆到稳定画像，5层时间维度如何实现高效且智能的记忆管理。',
    category: '技术解析',
    readTime: '11分钟',
    date: '2026-05-20',
    featured: false,
  },
  {
    slug: 'mem0-paper-architecture',
    title: 'Mem0 论文精读：可扩展长期记忆的架构设计',
    excerpt: '深入解读 Mem0 arXiv 论文，从记忆提取到图记忆增强，理解生产级记忆引擎的核心设计。',
    category: '技术解析',
    readTime: '14分钟',
    date: '2025-04-28',
    featured: false,
  },
  {
    slug: 'mem0-2026-algorithm-update',
    title: 'Mem0 2026 算法大更新：LoCoMo 92.5、LongMemEval 94.4',
    excerpt: '单次 ADD-only 提取、多信号融合检索、实体链接增强——Mem0 新算法在各大基准上取得突破性进展。',
    category: '深度评测',
    readTime: '10分钟',
    date: '2026-04-15',
    featured: false,
  },
  {
    slug: 'letta-stateful-agent-framework',
    title: 'Letta（原 MemGPT）：从学术原型到有状态 Agent 平台',
    excerpt: 'MemGPT 如何演进为 Letta Agent 平台，支持 TypeScript SDK、多后端部署和自我改进能力。',
    category: '架构分析',
    readTime: '12分钟',
    date: '2026-04-17',
    featured: false,
  },
  {
    slug: 'memos-memory-operating-system',
    title: 'MemOS：面向 AI 系统的记忆操作系统',
    excerpt: '清华大学/MemTensor 提出 MemOS，将记忆视为系统资源，统一管理纯文本、激活级和参数级记忆。',
    category: '架构分析',
    readTime: '13分钟',
    date: '2025-07-04',
    featured: false,
  },
  {
    slug: 'amem-zettelkasten-memory',
    title: 'A-MEM：基于 Zettelkasten 的自主体记忆演化',
    excerpt: '将卡片盒笔记法引入 AI 记忆管理，通过动态索引和链接创建实现记忆的自主演化。',
    category: '技术解析',
    readTime: '10分钟',
    date: '2025-02-17',
    featured: false,
  },
  {
    slug: 'zep-temporal-knowledge-graph',
    title: 'Zep：用时序知识图谱破解大模型"记忆断片"',
    excerpt: '双时间模型自动处理事实冲突，Graphiti 引擎驱动的动态知识图谱替代传统向量检索。',
    category: '架构分析',
    readTime: '11分钟',
    date: '2025-02-26',
    featured: false,
  },
  {
    slug: 'memory-framework-comparison-2026',
    title: '2026 记忆框架横评：Mem0 / Zep / LangMem / TiMem 实测对比',
    excerpt: '从接入难度、记忆质量、检索精度到延迟表现，四大主流记忆框架的全面实测与选型建议。',
    category: '选型指南',
    readTime: '15分钟',
    date: '2026-03-21',
    featured: false,
  },
  {
    slug: 'locomo-benchmark-explained',
    title: 'LoCoMo Benchmark：长期对话记忆评测的黄金标准',
    excerpt: '300轮对话、35个会话、9K token——深入理解记忆引擎最常用的评测基准。',
    category: '评测基准',
    readTime: '9分钟',
    date: '2024-02-27',
    featured: false,
  },
  {
    slug: 'longmemeval-benchmark',
    title: 'LongMemEval：五维评估聊天助手的长期记忆能力',
    excerpt: '500个精心设计的问题，覆盖信息提取、多会话推理、时间推理、知识更新和拒答五大能力。',
    category: '评测基准',
    readTime: '8分钟',
    date: '2024-10-14',
    featured: false,
  },
  {
    slug: 'memory-vs-rag-paradigm',
    title: '记忆系统 vs RAG：不只是检索的区别',
    excerpt: 'RAG 面向静态文档，记忆系统面向动态交互——从架构哲学到工程实践的深度对比。',
    category: '选型指南',
    readTime: '12分钟',
    date: '2026-06-16',
    featured: false,
  },
  {
    slug: 'agent-memory-four-layer-architecture',
    title: 'AI Agent 记忆四层架构：从工程实践到生产选型',
    excerpt: '工作记忆、短期记忆、长期记忆、元认知——2026年记忆系统已从可选插件升级为核心基础设施。',
    category: '架构分析',
    readTime: '14分钟',
    date: '2026-06-16',
    featured: false,
  },
  {
    slug: 'memory-evaluation-methodology',
    title: 'Agent Memory 评测体系：现有 Benchmark 的局限与未来',
    excerpt: '从单一检索准确率到多维度综合评估，记忆系统评测正经历从"能记住"到"记得好"的范式转变。',
    category: '评测基准',
    readTime: '10分钟',
    date: '2025-12-19',
    featured: false,
  },
  {
    slug: 'multimodal-memory-frontier',
    title: '多模态记忆：AI 记忆系统的下一个前沿',
    excerpt: '原生多模态模型推动跨模态记忆需求，图像、音频、视频的编码与检索带来全新挑战。',
    category: '行业动态',
    readTime: '9分钟',
    date: '2025-12-31',
    featured: false,
  },
  {
    slug: 'acm-lifecycle-memory-management',
    title: 'Agentic Context Management：记忆即生命周期',
    excerpt: '将 Agent 记忆视为生命周期而非简单存储，五个原语定义记忆管理的新范式。',
    category: '技术解析',
    readTime: '11分钟',
    date: '2026-07-23',
    featured: false,
  },
  {
    slug: 'memory-engine-overview',
    title: '14 大记忆引擎全景纵览：从图谱到类脑，2026 选型一张图',
    excerpt: 'Mem0、Zep、Letta、TiMem、MemoryBear、MemoryLake……14 款主流记忆引擎按出身、架构、定位逐个过一遍，附架构流派归类与选型建议，作为后续逐篇深度点评的开篇总览。',
    category: '选型指南',
    readTime: '14分钟',
    date: '2026-08-17',
    featured: false,
  },
  {
    slug: 'skills-mcp-marketplace-survey',
    title: 'Skills & MCP 市场收录调研：14 大记忆引擎在哪些 Agent 平台上架？',
    excerpt: '逐一核实 14 款记忆引擎在 Claude Code、Codex、Cursor、OpenClaw ClawHub、mcp.so、glama.ai 六大平台的 Skills/MCP 收录情况，附上架矩阵与明细表。',
    category: '行业动态',
    readTime: '12分钟',
    date: '2026-08-17',
    featured: false,
  },
  {
    slug: 'docs-display-benchmark',
    title: '文档展示对标清单：14 家记忆引擎的文档站与官网对外展示实测',
    excerpt: '逐个实抓 14 款记忆引擎的文档站与官网：文档入口形态、内容结构、上手步骤、可交互性、语言覆盖、llms.txt 与文档 MCP 的 Agent 可读性，以及首屏主张、基准公开度、客户背书与 CTA，附三档分档与自查清单。',
    category: '行业动态',
    readTime: '14分钟',
    date: '2026-09-17',
    featured: false,
  },
]

const categories = ['全部', '架构分析', '深度评测', '选型指南', '技术解析', '评测基准', '行业动态']

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const filteredInsights =
    selectedCategory === '全部'
      ? insights
      : insights.filter((i) => i.category === selectedCategory)

  const featuredInsight = insights.find((i) => i.featured)
  const otherInsights = filteredInsights.filter((i) => !i.featured || selectedCategory !== '全部')

  return (
    <div className="min-h-screen bg-paper texture-paper">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink-deep mb-4">
              洞察文章
            </h1>
            <p className="text-ink-light text-lg max-w-2xl mx-auto">
              深度技术分析、选型指南、行业洞察，帮你全面理解记忆引擎领域
            </p>
          </motion.div>

          {/* Featured Article */}
          {featuredInsight && selectedCategory === '全部' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Link href={`/insights/${featuredInsight.slug}`}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
                        <Tag className="w-3 h-3" />
                        {featuredInsight.category}
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-deep mb-4 group-hover:text-gold transition-colors">
                        {featuredInsight.title}
                      </h2>
                      <p className="text-ink-light leading-relaxed mb-6">
                        {featuredInsight.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-ink-light">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredInsight.readTime}
                        </span>
                        <span>{featuredInsight.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-gold/20 to-cyan/20 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-gold/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-ink-deep text-white'
                    : 'bg-white text-ink-light hover:bg-ink-deep/5 border border-ink-deep/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherInsights.map((insight, i) => (
              <motion.div
                key={insight.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link href={`/insights/${insight.slug}`}>
                  <div className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-ink-deep/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                      <BookOpen className="w-6 h-6 text-ink-light group-hover:text-gold transition-colors" />
                    </div>

                    {/* Category */}
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-ink-deep/5 text-ink-light text-xs w-fit mb-3">
                      {insight.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-ink-deep mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {insight.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-ink-light text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                      {insight.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-ink-deep/5">
                      <span className="flex items-center gap-1 text-xs text-ink-light">
                        <Clock className="w-3 h-3" />
                        {insight.readTime}
                      </span>
                      <span className="text-gold text-sm font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        阅读全文
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {otherInsights.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-ink-light/50 mx-auto mb-4" />
              <p className="text-ink-light text-lg">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-ink-deep text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">Agent Memory · 独立第三方评测平台</p>
        </div>
      </footer>
    </div>
  )
}
