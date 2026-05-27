import type { RevenueByDay } from './types'

interface RevenueChartProps {
  data: RevenueByDay[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 0)
  const total = data.reduce((sum, d) => sum + d.revenue, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const getBarHeight = (revenue: number) => {
    if (maxRevenue === 0) return 4
    return Math.max((revenue / maxRevenue) * 100, 4) // minimum 4% height for visibility
  }

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-5 sm:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-base-content">Revenue Trend</h3>
          <p className="text-sm text-base-content/60 mt-0.5">Daily revenue over the past 30 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-base-content">{formatCurrency(total)}</p>
          <p className="text-xs text-base-content/60">Total this period</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-48 sm:h-56">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-base-300/50 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end gap-0.5 sm:gap-1 px-1">
          {data.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-base-content/60">
              No revenue data yet
            </div>
          )}
          {data.map((day, index) => {
            const height = getBarHeight(day.revenue)
            const isHighest = day.revenue === maxRevenue
            const showLabel = index === 0 || (index + 1) % 5 === 0 || index === data.length - 1

            return (
              <div key={day.date} className="flex-1 min-w-0 flex flex-col items-center gap-2 group">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 transform -translate-y-full bg-neutral text-neutral-content text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg z-10 whitespace-nowrap pointer-events-none">
                  {formatCurrency(day.revenue)}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="border-4 border-transparent border-t-neutral" />
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full relative">
                  <div
                    data-testid="revenue-bar"
                    className={`w-full rounded-t-sm transition-all duration-500 ease-out ${
                      isHighest
                        ? 'bg-gradient-to-t from-primary to-primary/70'
                        : 'bg-gradient-to-t from-base-300 to-base-200 group-hover:from-primary/40 group-hover:to-primary/20'
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: '8px',
                      animationDelay: `${index * 50}ms`,
                    }}
                  />
                </div>

                {/* Date label — only shown for first, every 5th, and last entry */}
                <span className={`text-xs text-base-content/60 font-medium whitespace-nowrap ${showLabel ? '' : 'invisible'}`}>
                  {formatDate(day.date)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-base-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-rose-500 to-rose-400" />
          <span className="text-xs text-base-content/70">Highest day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-base-300 to-base-200" />
          <span className="text-xs text-base-content/70">Other days</span>
        </div>
      </div>
    </div>
  )
}
