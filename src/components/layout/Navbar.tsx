'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Menu, X, Layers, BarChart3, BookOpen } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: '首页', icon: Brain },
    { href: '/evaluate', label: '评测对比', icon: BarChart3 },
    { href: '/engines', label: '引擎档案', icon: Layers },
    { href: '/insights', label: '洞察文章', icon: BookOpen },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-ink-deep/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-cyan flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
                <span className="font-serif text-xl font-semibold text-ink-deep">Agent Memory</span>
              <span className="hidden sm:block text-xs text-ink-light">agent-memory.cn</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-ink hover:text-ink-deep hover:bg-ink-deep/5 transition-colors flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-ink-deep/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-ink-deep/5">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink hover:text-ink-deep hover:bg-ink-deep/5 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
