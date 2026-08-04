'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X as XIcon, Minus, BarChart3, Cpu, Coins, Code, Target } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import RadarChart from '@/components/engine/RadarChart'
import enginesData from '@/data/engines.json'

const categoryIcons: Record<string, React.ElementType> = {
  architecture: Cpu,
  performance: BarChart3,
  cost: Coins,
  dx: Code,
  scenario: Target,
}

export default function EvaluatePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const engines = enginesData.engines
  const categories = enginesData.categories

  const metrics = [
    { key: 'latency', label: '响应延迟', higher: false, category: 'performance' },
    { key: 'scalability', label: '可扩展性', higher: true, category: 'performance' },
    { key: 'accuracy', label: '准确性', higher: true, category: 'performance' },
    { key: 'costEfficiency', label: '成本效益', higher: true, category: 'cost' },
    { key: 'developerExperience', label: '开发者体验', higher: true, category: 'dx' },
  ]

  const getCategoryForMetric = (key: string) => {
    return metrics.find((m) => m.key === key)?.category || 'performance'
  }

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
              评测对比
            </h1>
            <p className="text-ink-light text-lg max-w-2xl mx-auto">
              从五大维度全面对比主流记忆引擎，找到最适合你的解决方案
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-ink-deep text-white'
                  : 'bg-white text-ink-light hover:bg-ink-deep/5'
              }`}
            >
              全部维度
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-ink-deep text-white'
                    : 'bg-white text-ink-light hover:bg-ink-deep/5'
                }`}
              >
                {(() => {
                  const Icon = categoryIcons[cat.id] || BarChart3
                  return <Icon className="w-4 h-4" />
                })()}
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden mb-12"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-deep/5">
                    <th className="text-left p-4 font-serif font-semibold text-ink-deep w-48">
                      评测维度
                    </th>
                    {engines.map((engine) => (
                      <th key={engine.id} className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: engine.color }}
                          >
                            {engine.logo}
                          </div>
                          <span className="font-serif font-semibold text-ink-deep">
                            {engine.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics
                    .filter(
                      (m) => !selectedCategory || getCategoryForMetric(m.key) === selectedCategory
                    )
                    .map((metric, i) => (
                      <tr
                        key={metric.key}
                        className={`border-b border-ink-deep/5 ${
                          i % 2 === 0 ? 'bg-ink-deep/[0.02]' : ''
                        }`}
                      >
                        <td className="p-4 font-medium text-ink">{metric.label}</td>
                        {engines.map((engine) => {
                          const value = engine.metrics[metric.key as keyof typeof engine.metrics]
                          const max = Math.max(...engines.map((e) => e.metrics[metric.key as keyof typeof e.metrics]))
                          const min = Math.min(...engines.map((e) => e.metrics[metric.key as keyof typeof e.metrics]))

                          let indicator: 'high' | 'medium' | 'low' | 'equal' = 'equal'
                          if (value === max) indicator = 'high'
                          else if (value === min) indicator = 'low'
                          else indicator = 'medium'

                          return (
                            <td key={engine.id} className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`w-3 h-3 rounded-full transition-colors ${
                                        level <= Math.ceil(value / 20)
                                          ? indicator === 'high'
                                            ? 'bg-gold'
                                            : indicator === 'low'
                                            ? 'bg-cyan'
                                            : 'bg-gold/60'
                                          : 'bg-ink-deep/10'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-lg font-semibold text-ink-deep ml-2">
                                  {value}
                                </span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}

                  {/* Pricing Row */}
                  <tr className="border-b border-ink-deep/5 bg-ink-deep/[0.02]">
                    <td className="p-4 font-medium text-ink">定价起始价</td>
                    {engines.map((engine) => (
                      <td key={engine.id} className="p-4 text-center">
                        <span className="text-lg font-semibold text-ink-deep">
                          {engine.pricing.freeTier ? '免费' : `$${engine.pricing.startingPrice}`}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Radar Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl font-bold text-ink-deep mb-8 text-center">
              雷达图对比
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {engines.map((engine, i) => {
                const data = [
                  { label: '延迟', value: engine.metrics.latency },
                  { label: '扩展', value: engine.metrics.scalability },
                  { label: '准确', value: engine.metrics.accuracy },
                  { label: '成本', value: engine.metrics.costEfficiency },
                  { label: '开发', value: engine.metrics.developerExperience },
                ]
                return (
                  <motion.div
                    key={engine.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                      style={{ backgroundColor: engine.color }}
                    >
                      {engine.logo}
                    </div>
                    <h3 className="font-serif font-semibold text-ink-deep mb-4">{engine.name}</h3>
                    <RadarChart data={data} size={200} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-ink-deep to-ink-deep/80 rounded-2xl p-8 text-white"
          >
            <h3 className="font-serif text-2xl font-bold mb-6">关键发现</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-semibold text-gold mb-2">最佳综合表现</h4>
                <p className="text-white/80 text-sm">
                  Mem0 在开发者体验和扩展性方面表现突出，特别适合需要快速迭代的团队
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-semibold text-cyan mb-2">学术研究首选</h4>
                <p className="text-white/80 text-sm">
                  MemGPT 和 TiMem 在准确性指标上领先，适合对精度有极高要求的场景
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-semibold text-gold mb-2">成本效益最优</h4>
                <p className="text-white/80 text-sm">
                  MemOS 和 TiMem 作为开源方案，在保证性能的同时零成本入门
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-semibold text-cyan mb-2">长对话场景</h4>
                <p className="text-white/80 text-sm">
                  TiMem 的时间层级架构在超长对话(100轮+)中展现出显著优势
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-ink-deep text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            Agent Memory · 独立第三方评测平台
          </p>
        </div>
      </footer>
    </div>
  )
}
