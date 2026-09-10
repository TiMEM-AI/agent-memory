'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

import { insightsData } from '@/data/insights'

export default function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const insight = insightsData[resolvedParams.slug]

  if (!insight) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-serif text-2xl text-ink-deep mb-4">文章未找到</h1>
          <Link href="/insights" className="text-gold hover:underline">
            返回文章列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper texture-paper">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-ink-light hover:text-ink-deep transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-card mb-8"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
              {insight.category}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink-deep mb-4 leading-tight">
              {insight.title}
            </h1>

            <p className="text-xl text-ink-light mb-6 leading-relaxed">
              {insight.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-ink-light pb-6 border-b border-ink-deep/5">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {insight.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {insight.readTime}
              </span>
            </div>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-card prose prose-lg max-w-none"
          >
            <div className="text-ink leading-relaxed">
              {insight.content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={i} className="font-serif text-3xl font-bold text-ink-deep mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  )
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-serif text-2xl font-bold text-ink-deep mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={i} className="font-serif text-xl font-bold text-ink-deep mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('```')) {
                  return null
                }
                if (paragraph.trim() === '') {
                  return <div key={i} className="h-4" />
                }
                // Handle inline code
                if (paragraph.includes('`') && !paragraph.startsWith('-') && !paragraph.startsWith('*')) {
                  return (
                    <p key={i} className="mb-4">
                      {paragraph.split(/(`[^`]+`)/).map((part, j) => {
                        if (part.startsWith('`') && part.endsWith('`')) {
                          return <code key={j} className="px-1.5 py-0.5 bg-ink-deep/5 rounded text-sm font-mono text-gold">{part.slice(1, -1)}</code>
                        }
                        return part
                      })}
                    </p>
                  )
                }
                return <p key={i} className="mb-4">{paragraph}</p>
              })}
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="font-serif text-xl font-bold text-ink-deep mb-6">相关阅读</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(insightsData)
                .filter(([slug]) => slug !== resolvedParams.slug)
                .slice(0, 2)
                .map(([slug, related]) => (
                  <Link
                    key={slug}
                    href={`/insights/${slug}`}
                    className="group bg-white rounded-xl p-4 shadow-card hover:shadow-hover transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ink-deep/5 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-ink-light" />
                      </div>
                      <div>
                        <h4 className="font-medium text-ink group-hover:text-gold transition-colors line-clamp-1">
                          {related.title}
                        </h4>
                        <p className="text-sm text-ink-light mt-1 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-ink-deep text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">Agent Memory · 独立第三方评测平台</p>
        </div>
      </footer>
    </div>
  )
}
