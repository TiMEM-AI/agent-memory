'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Check,
  X as XIcon,
  Star,
  Zap,
  Shield,
  Sparkles,
  Clock,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import RadarChart from '@/components/engine/RadarChart'
import enginesData from '@/data/engines.json'

export default function EngineDetail({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'code'>('overview')

  useEffect(() => {
    setMounted(true)
  }, [])

  const engine = enginesData.engines.find(
    (e) => e.id === resolvedParams.name
  )

  if (!engine) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-serif text-2xl text-ink-deep mb-4">引擎未找到</h1>
          <Link href="/engines" className="text-gold hover:underline">
            返回引擎列表
          </Link>
        </div>
      </div>
    )
  }

  const radarData = [
    { label: '延迟', value: engine.metrics.latency },
    { label: '扩展性', value: engine.metrics.scalability },
    { label: '准确性', value: engine.metrics.accuracy },
    { label: '成本效益', value: engine.metrics.costEfficiency },
    { label: '开发体验', value: engine.metrics.developerExperience },
  ]

  const tabs = [
    { id: 'overview', label: '概览' },
    { id: 'metrics', label: '详细指标' },
    { id: 'code', label: '代码示例' },
  ]

  return (
    <div className="min-h-screen bg-paper texture-paper">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 text-ink-light hover:text-ink-deep transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回引擎列表
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Logo & Basic Info */}
              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  style={{ backgroundColor: engine.color }}
                >
                  {engine.logo}
                </div>
                <div>
                  <h1 className="font-serif text-4xl font-bold text-ink-deep mb-2">
                    {engine.name}
                  </h1>
                  <p className="text-ink-light text-lg mb-2">{engine.org}</p>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        engine.orgType === 'company'
                          ? 'bg-blue-50 text-blue-600'
                          : engine.orgType === 'academic'
                          ? 'bg-purple-50 text-purple-600'
                          : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {engine.orgType === 'company'
                        ? '企业'
                        : engine.orgType === 'academic'
                        ? '学术'
                        : '开源'}
                    </span>
                    {engine.pricing.freeTier && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                        免费可用
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="flex-1 flex justify-center">
                <RadarChart data={radarData} size={240} />
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-8 pt-6 border-t border-ink-deep/5">
              <p className="text-xl text-ink leading-relaxed">{engine.tagline}</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-card w-fit"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-ink-deep text-white'
                    : 'text-ink-light hover:bg-ink-deep/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Architecture */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-xl font-bold text-ink-deep mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    架构特点
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-ink-light text-sm">架构类型</span>
                      <p className="text-ink font-medium">
                        {engine.architecture.type === 'graph'
                          ? '图谱架构'
                          : engine.architecture.type === 'hierarchical'
                          ? '层级架构'
                          : engine.architecture.type === 'hybrid'
                          ? '混合架构'
                          : '向量架构'}
                      </p>
                    </div>
                    <div>
                      <span className="text-ink-light text-sm">LLM自我管理</span>
                      <p className="text-ink font-medium">
                        {engine.architecture.selfManaged ? '是' : '否'}
                      </p>
                    </div>
                    {engine.architecture.memoryLevels && (
                      <div>
                        <span className="text-ink-light text-sm">记忆层级</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {engine.architecture.memoryLevels.map((level) => (
                            <span
                              key={level}
                              className="px-2 py-1 bg-ink-deep/5 rounded text-sm text-ink"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-ink-light text-sm mt-4">
                    {engine.architecture.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-xl font-bold text-ink-deep mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gold" />
                    核心亮点
                  </h3>
                  <ul className="space-y-3">
                    {engine.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-ink">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-xl font-bold text-ink-deep mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    适用场景
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-ink-light text-sm">推荐</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {engine.useCases.recommended.map((case_) => (
                          <span
                            key={case_}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                          >
                            {case_}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-ink-light text-sm">不推荐</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {engine.useCases.notRecommended.map((case_) => (
                          <span
                            key={case_}
                            className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                          >
                            {case_}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-xl font-bold text-ink-deep mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-gold" />
                    相关链接
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={engine.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-deep/5 hover:bg-ink-deep/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-ink-light" />
                      <span className="text-ink">官方网站</span>
                    </a>
                    <a
                      href={engine.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-deep/5 hover:bg-ink-deep/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-ink-light" />
                      <span className="text-ink">文档</span>
                    </a>
                    {engine.links.github && (
                      <a
                        href={engine.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-ink-deep/5 hover:bg-ink-deep/10 transition-colors"
                      >
                        <Github className="w-5 h-5 text-ink-light" />
                        <span className="text-ink">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-xl font-bold text-ink-deep mb-6">详细指标</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: '响应延迟', value: engine.metrics.latency, desc: 'P95检索延迟评分' },
                    { label: '可扩展性', value: engine.metrics.scalability, desc: '大规模部署能力' },
                    { label: '准确性', value: engine.metrics.accuracy, desc: '记忆检索准确度' },
                    { label: '成本效益', value: engine.metrics.costEfficiency, desc: '性价比评分' },
                    { label: '开发体验', value: engine.metrics.developerExperience, desc: 'SDK和文档质量' },
                  ].map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-ink-deep/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-ink">{metric.label}</span>
                        <span className="text-2xl font-bold text-gold">{metric.value}</span>
                      </div>
                      <div className="w-full h-2 bg-ink-deep/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold to-cyan rounded-full transition-all duration-1000"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <p className="text-ink-light text-sm mt-2">{metric.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mt-8 pt-6 border-t border-ink-deep/5">
                  <h4 className="font-serif text-lg font-bold text-ink-deep mb-4">定价</h4>
                  <p className="text-ink-light">{engine.pricing.details}</p>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-xl font-bold text-ink-deep mb-6">最小集成示例</h3>
                <div className="bg-ink-deep rounded-xl p-6 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-green-400">{engine.codeExample.code}</code>
                  </pre>
                </div>
                <p className="text-ink-light text-sm mt-4">
                  完整文档请访问{' '}
                  <a href={engine.links.docs} className="text-gold hover:underline">
                    官方文档
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-ink-deep text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">Agent Memory · 独立第三方评测平台</p>
        </div>
      </footer>
    </div>
  )
}
