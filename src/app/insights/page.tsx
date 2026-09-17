'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Clock, Calendar, ArrowRight, Tag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

import { insightsData } from '@/data/insights'

const insights = Object.entries(insightsData).map(([slug, article]) => ({
  slug,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  readTime: article.readTime,
  date: article.date,
  featured: article.featured ?? false,
}))

const categories = ['全部', '架构分析', '深度评测', '选型指南', '技术解析', '评测基准', '行业动态']

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  // 按发布时间倒序，最新文章排在最前
  const sortedInsights = [...insights].sort((a, b) => b.date.localeCompare(a.date))

  const filteredInsights =
    selectedCategory === '全部'
      ? sortedInsights
      : sortedInsights.filter((i) => i.category === selectedCategory)

  const featuredInsight = sortedInsights.find((i) => i.featured)
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
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink-deep text-white text-sm font-medium">
                          精选
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium">
                          <Tag className="w-3 h-3" />
                          {featuredInsight.category}
                        </span>
                      </div>
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
            <span className="ml-auto self-center text-sm text-ink-light">
              共 {filteredInsights.length} 篇 · 按发布时间倒序
            </span>
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
                      <span className="flex items-center gap-3 text-xs text-ink-light">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {insight.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {insight.date}
                        </span>
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
