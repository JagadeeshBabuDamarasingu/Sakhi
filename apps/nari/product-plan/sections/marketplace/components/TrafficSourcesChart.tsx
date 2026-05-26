import type { TrafficSource } from '../types'

interface TrafficSourcesChartProps {
  data: TrafficSource[]
}

const sourceColors: Record<string, { bg: string; text: string; ring: string }> = {
  'ONDC Network': {
    bg: 'bg-rose-500 dark:bg-rose-600',
    text: 'text-rose-600 dark:text-rose-400',
    ring: 'ring-rose-200 dark:ring-rose-900/50',
  },
  Direct: {
    bg: 'bg-amber-500 dark:bg-amber-600',
    text: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-200 dark:ring-amber-900/50',
  },
  'Social Media': {
    bg: 'bg-emerald-500 dark:bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-200 dark:ring-emerald-900/50',
  },
  Search: {
    bg: 'bg-blue-500 dark:bg-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-200 dark:ring-blue-900/50',
  },
}

const defaultColor = {
  bg: 'bg-stone-400 dark:bg-stone-600',
  text: 'text-stone-600 dark:text-stone-400',
  ring: 'ring-stone-200 dark:ring-stone-800',
}

export function TrafficSourcesChart({ data }: TrafficSourcesChartProps) {
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Traffic Sources</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Where your visitors come from</p>
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
              { elements: [] as JSX.Element[], offset: 0 }
            ).elements}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
              {sortedData[0]?.percentage}%
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 text-center px-2">
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
                <span className="text-sm text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
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
