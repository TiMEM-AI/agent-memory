'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Zap, Shield, Sparkles, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import EngineCard from '@/components/engine/EngineCard'
import RadarChart from '@/components/engine/RadarChart'
import enginesData from '@/data/engines.json'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const engines = enginesData.engines

  const radarData = [
    { label: '延迟', value: Math.round(engines.reduce((acc, e) => acc + e.metrics.latency, 0) / engines.length) },
    { label: '扩展性', value: Math.round(engines.reduce((acc, e) => acc + e.metrics.scalability, 0) / engines.length) },
    { label: '准确性', value: Math.round(engines.reduce((acc, e) => acc + e.metrics.accuracy, 0) / engines.length) },
    { label: '成本', value: Math.round(engines.reduce((acc, e) => acc + e.metrics.costEfficiency, 0) / engines.length) },
    { label: '开发体验', value: Math.round(engines.reduce((acc, e) => acc + e.metrics.developerExperience, 0) / engines.length) },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
          {/* 神经网络装饰线 */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-deep/5 text-ink-light text-sm mb-8"
            >
              <Brain className="w-4 h-4 text-gold" />
              AI 基础设施的关键一环
            </motion.div>

            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-bold text-ink-deep mb-6 leading-tight"
            >
              记忆之境
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold to-cyan">
                Agent Memory
                </span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-ink-light max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              深度评测 LLM 记忆引擎，为你的 AI 应用选择最适合的记忆解决方案。
              像选择云服务提供商一样，选择你的记忆层。
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/evaluate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-cyan text-white font-medium hover:shadow-lg hover:shadow-gold/25 transition-all group"
              >
                开始评测对比
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/engines"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-ink-deep/10 text-ink-deep font-medium hover:bg-ink-deep/5 transition-all"
              >
                浏览引擎档案
              </Link>
            </motion.div>
          </div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="w-6 h-6 text-ink-light" />
          </motion.div>
        </div>
      </section>

      {/* 评测维度说明 */}
      <section className="py-20 bg-ink-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">评测维度</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              从架构、性能、成本、开发者体验、场景适配五个维度全面评估
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Brain, title: '架构设计', desc: '记忆组织方式、上下文窗口利用', weight: '25%' },
              { icon: Zap, title: '性能指标', desc: '延迟、吞吐量、记忆效率', weight: '30%' },
              { icon: Shield, title: '成本效益', desc: '免费套餐、规模化成本', weight: '20%' },
              { icon: Sparkles, title: '开发体验', desc: '文档、SDK、集成难度', weight: '15%' },
              { icon: Brain, title: '场景适配', desc: '短对话、长对话、多模态', weight: '10%' },
            ].map((dim, i) => (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-cyan flex items-center justify-center mx-auto mb-4">
                  <dim.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{dim.title}</h3>
                <p className="text-sm text-white/60 mb-2">{dim.desc}</p>
                <span className="text-gold text-sm font-medium">{dim.weight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 引擎概览 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 雷达图 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cyan/20 rounded-full blur-3xl" />
                <RadarChart data={radarData} size={320} />
              </div>
            </motion.div>

            {/* 文字说明 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-deep mb-6">
                全面客观的评测体系
              </h2>
              <p className="text-ink-light text-lg mb-6 leading-relaxed">
                我们建立了涵盖五大维度的评测体系，从实际应用角度出发，为每款记忆引擎提供公正、深入的评估报告。
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '基于公开论文和官方文档的第一手资料',
                  '量化指标与定性分析相结合',
                  '持续更新，跟进行业最新发展',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/evaluate"
                className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
              >
                查看详细对比
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 引擎卡片 */}
      <section className="py-20 bg-ink-deep/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-deep mb-4">
              主流记忆引擎
            </h2>
            <p className="text-ink-light max-w-xl mx-auto">
              从学术研究到商业落地，覆盖当前最具代表性的记忆解决方案
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engines.map((engine, i) => (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <EngineCard engine={engine} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-ink-deep/10 text-ink-deep font-medium hover:bg-ink-deep/5 transition-all"
            >
              查看完整档案
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ink-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-cyan flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif text-lg font-semibold">记忆之境</span>
                <span className="block text-xs text-white/60">Agent Memory · agent-memory.cn</span>
              </div>
            </div>
            <p className="text-white/40 text-sm">
              独立第三方评测平台 · 推动技术透明化
            </p>
             <p className="text-white/30 text-xs mt-1">agent-memory.cn</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
