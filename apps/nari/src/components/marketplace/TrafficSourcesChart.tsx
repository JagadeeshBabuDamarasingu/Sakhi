import type { ReactElement } from 'react'
import type { TrafficSource } from './types'

interface TrafficSourcesChartProps {
  data: TrafficSource[]
}

const sourceColors: Record<string, { bg: string; text: string; ring: string }> = {
  'ONDC Network': {
    bg: 'bg-primary',
    text: 'text-primary',
    ring: 'ring-primary/20',
  },
  Direct: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    ring: 'ring-secondary/20',
  },
  'Social Media': {
    bg: 'bg-success',
    text: 'text-success',
    ring: 'ring-success/20',
  },
  Search: {
    bg: 'bg-info',
    text: 'text-info',
    ring: 'ring-info/20',
  },
}

const defaultColor = {
  bg: 'bg-neutral',
  text: 'text-base-content/70',
  ring: 'ring-base-300',
}

export function TrafficSourcesChart({ data }: TrafficSourcesChartProps) {
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-5 sm:p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-base-content">Traffic Sources</h3>
        <p className="text-sm text-base-content/60 mt-0.5">Where your visitors come from</p>
      </div>

      {/* Donut Chart Visual */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44">
          {/* SVG Donut Chart */}
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {sortedData.reduce(
              (acc, source, index) => {
                const color = sourceColors[source.source] || defaultColor
                const strokeDasharray = `${source.percentage} ${100 - source.percentage}`
                const element = (
                  <circle
                    key={source.source}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeWidth="12"
                    className={color.bg}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-acc.offset}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dasharray 0.5s ease',
                    }}
                  />
                )
                acc.elements.push(element)
                acc.offset += source.percentage
                return acc
              },
              { elements: [] as ReactElement[], offset: 0 }
            ).elements}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-base-content">
              {sortedData[0]?.percentage}%
            </span>
            <span className="text-xs text-base-content/60 text-center px-2">
              {sortedData[0]?.source}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {sortedData.map((source) => {
          const color = sourceColors[source.source] || defaultColor
          return (
            <div key={source.source} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${color.bg} ring-4 ${color.ring}`} />
                <span className="text-sm text-base-content/80 group-hover:text-base-content transition-colors">
                  {source.source}
                </span>
              </div>
              <span className={`text-sm font-semibold ${color.text}`}>{source.percentage}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
