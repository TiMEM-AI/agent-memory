'use client'

import { use, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

import { insightsData } from '@/data/insights'

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]\n]+\]\([^)\n]+\)|https?:\/\/[^\s，。、；：）】"'<]+)/

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-ink-deep">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-ink-deep/5 rounded text-sm font-mono text-gold">
          {part.slice(1, -1)}
        </code>
      )
    }
    const mdLink = part.match(/^\[([^\]\n]+)\]\(([^)\n]+)\)$/)
    if (mdLink) {
      return (
        <a
          key={i}
          href={mdLink[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline break-all"
        >
          {mdLink[1]}
        </a>
      )
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline break-all"
        >
          {part}
        </a>
      )
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

function renderContent(content: string): ReactNode[] {
  const lines = content.split('\n')
  const nodes: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Markdown 表格块
    if (line.trim().startsWith('|')) {
      const block: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        block.push(lines[i])
        i++
      }
      const rows = block
        .map((l) => l.trim().replace(/^\|/, '').replace(/\|$/, ''))
        .filter((l) => !/^[\s:|-]+$/.test(l))
        .map((l) => l.split('|').map((cell) => cell.trim()))
      const [header = [], ...body] = rows
      nodes.push(
        <div key={nodes.length} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-ink-deep/5">
                {header.map((cell, c) => (
                  <th
                    key={c}
                    className="px-3 py-2 text-left font-semibold text-ink-deep border-b border-ink-deep/10 whitespace-nowrap"
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="border-b border-ink-deep/5">
                  {row.map((cell, c) => (
                    <td key={c} className="px-3 py-2 text-ink align-top">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (line.startsWith('```')) {
      i++
      continue
    }

    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={nodes.length} className="font-serif text-xl font-bold text-ink-deep mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
      i++
      continue
    }
    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={nodes.length} className="font-serif text-2xl font-bold text-ink-deep mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
      i++
      continue
    }
    if (line.startsWith('# ')) {
      nodes.push(
        <h1 key={nodes.length} className="font-serif text-3xl font-bold text-ink-deep mt-8 mb-4">
          {line.replace('# ', '')}
        </h1>
      )
      i++
      continue
    }

    if (line.startsWith('> ')) {
      nodes.push(
        <blockquote key={nodes.length} className="border-l-4 border-gold/40 pl-4 my-4 text-ink-light">
          {renderInline(line.slice(2))}
        </blockquote>
      )
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={nodes.length} className="list-disc pl-6 mb-4 space-y-1">
          {items.map((item, n) => (
            <li key={n}>{renderInline(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      nodes.push(
        <ol key={nodes.length} className="list-decimal pl-6 mb-4 space-y-1">
          {items.map((item, n) => (
            <li key={n}>{renderInline(item)}</li>
          ))}
        </ol>
      )
      continue
    }

    if (line.trim() === '') {
      nodes.push(<div key={nodes.length} className="h-4" />)
      i++
      continue
    }

    nodes.push(
      <p key={nodes.length} className="mb-4">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return nodes
}

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
              {renderContent(insight.content)}
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
