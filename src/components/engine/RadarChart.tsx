'use client'

interface RadarChartProps {
  data: {
    label: string
    value: number
  }[]
  size?: number
}

export default function RadarChart({ data, size = 300 }: RadarChartProps) {
  const center = size / 2
  const maxRadius = (size / 2) * 0.75
  const levels = 5
  const angleStep = (Math.PI * 2) / data.length

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const radius = (d.value / 100) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      ...d,
    }
  })

  const gridPoints = (level: number) => {
    return data.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      const radius = (level / levels) * maxRadius
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`
    })
  }

  const dataPoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      {/* 网格背景 */}
      {Array.from({ length: levels }).map((_, i) => (
        <polygon
          key={i}
          points={gridPoints(i + 1).join(' ')}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1"
        />
      ))}

      {/* 轴线 */}
      {data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(angle)}
            y2={center + maxRadius * Math.sin(angle)}
            stroke="#e5e5e5"
            strokeWidth="1"
          />
        )
      })}

      {/* 数据区域 */}
      <polygon
        points={dataPoints}
        fill="url(#gradient)"
        fillOpacity="0.3"
        stroke="url(#gradient)"
        strokeWidth="2"
        className="transition-all duration-500"
      />

      {/* 数据点 */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#c9a962" className="drop-shadow-md" />
          <circle
            cx={p.x}
            cy={p.y}
            r="8"
            fill="#c9a962"
            fillOpacity="0.2"
            className="animate-pulse-glow"
          />
        </g>
      ))}

      {/* 标签 */}
      {points.map((p, i) => {
        const labelRadius = maxRadius + 30
        const labelX = center + labelRadius * Math.cos(i * angleStep - Math.PI / 2)
        const labelY = center + labelRadius * Math.sin(i * angleStep - Math.PI / 2)

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-light text-xs font-medium"
          >
            {p.label}
          </text>
        )
      })}

      {/* 渐变定义 */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a962" />
          <stop offset="100%" stopColor="#64b5c6" />
        </linearGradient>
      </defs>
    </svg>
  )
}
