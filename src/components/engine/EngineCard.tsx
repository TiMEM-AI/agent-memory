'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface EngineCardProps {
  engine: {
    id: string
    name: string
    org: string
    orgType: string
    tagline: string
    logo: string
    color: string
    metrics: {
      latency: number
      scalability: number
      accuracy: number
      costEfficiency: number
      developerExperience: number
    }
    pricing: {
      freeTier: boolean
      startingPrice: number
    }
    highlights: string[]
  }
  compact?: boolean
}

export default function EngineCard({ engine, compact = false }: EngineCardProps) {
  const overallScore = Math.round(
    (engine.metrics.latency +
      engine.metrics.scalability +
      engine.metrics.accuracy +
      engine.metrics.costEfficiency +
      engine.metrics.developerExperience) / 5
  )

  return (
    <Link href={`/engines/${engine.id}`}>
      <div className="group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
        {/* 装饰性渐变角 */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 transform translate-x-8 -translate-y-8"
          style={{ backgroundColor: engine.color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: engine.color }}
            >
              {engine.logo}
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink-deep group-hover:text-gold transition-colors">
                {engine.name}
              </h3>
              <p className="text-sm text-ink-light">{engine.org}</p>
            </div>
          </div>
          {!compact && (
            <div className="text-right">
              <div className="text-3xl font-bold text-gold">{overallScore}</div>
              <div className="text-xs text-ink-light">综合评分</div>
            </div>
          )}
        </div>

        {!compact && (
          <>
            <p className="text-ink-light text-sm mb-4 line-clamp-2">{engine.tagline}</p>

            {/* 指标预览 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <MetricBadge label="延迟" value={engine.metrics.latency} />
              <MetricBadge label="扩展性" value={engine.metrics.scalability} />
              <MetricBadge label="成本" value={engine.metrics.costEfficiency} />
            </div>

            {/* 亮点标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {engine.highlights.slice(0, 2).map((highlight, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-ink-deep/5 text-ink-light text-xs rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-ink-deep/5">
          <div className="flex items-center gap-2">
            {engine.pricing.freeTier ? (
              <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                免费可用
              </span>
            ) : (
              <span className="text-sm text-ink-light">
                ${engine.pricing.startingPrice}/月起
              </span>
            )}
          </div>
          <span className="text-gold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            深入了解
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function MetricBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-2 bg-ink-deep/5 rounded-lg">
      <div className="text-lg font-semibold text-ink-deep">{value}</div>
      <div className="text-xs text-ink-light">{label}</div>
    </div>
  )
}
