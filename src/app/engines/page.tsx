'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import EngineCard from '@/components/engine/EngineCard'
import enginesData from '@/data/engines.json'

export default function EnginesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOrgType, setFilterOrgType] = useState<string | null>(null)

  const engines = enginesData.engines
  const categories = [
    { id: null, label: '全部' },
    { id: 'company', label: '企业' },
    { id: 'academic', label: '学术' },
    { id: 'open-source', label: '开源' },
  ]

  const filteredEngines = engines.filter((engine) => {
    const matchesSearch =
      searchQuery === '' ||
      engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engine.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesOrgType = filterOrgType === null || engine.orgType === filterOrgType
    return matchesSearch && matchesOrgType
  })

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
              引擎档案
            </h1>
            <p className="text-ink-light text-lg max-w-2xl mx-auto">
              深入了解每款记忆引擎的架构特点、核心优势和适用场景
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
              <input
                type="text"
                placeholder="搜索引擎..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-ink-deep/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id || 'all'}
                  onClick={() => setFilterOrgType(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterOrgType === cat.id
                      ? 'bg-ink-deep text-white'
                      : 'bg-white text-ink-light hover:bg-ink-deep/5 border border-ink-deep/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-1 bg-white rounded-lg p-1 border border-ink-deep/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-ink-deep text-white' : 'text-ink-light'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-ink-deep text-white' : 'text-ink-light'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Engine List */}
          {filteredEngines.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-light text-lg">没有找到匹配的引擎</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEngines.map((engine, i) => (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <EngineCard engine={engine} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEngines.map((engine, i) => (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <EngineCard engine={engine} compact />
                </motion.div>
              ))}
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
