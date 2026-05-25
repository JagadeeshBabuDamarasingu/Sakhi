import type { RevenueByDay } from '../types'

interface RevenueChartProps {
  data: RevenueByDay[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue))
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
    return Math.max((revenue / maxRevenue) * 100, 4) // minimum 4% height for visibility
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Revenue Trend</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Daily revenue over the past week</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">{formatCurrency(total)}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">Total this week</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-48 sm:h-56">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-stone-100 dark:border-stone-800/50 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end justify-between gap-2 sm:gap-4 px-1">
          {data.map((day, index) => {
            const height = getBarHeight(day.revenue)
            const isHighest = day.revenue === maxRevenue

            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 transform -translate-y-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg z-10 whitespace-nowrap pointer-events-none">
                  {formatCurrency(day.revenue)}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="border-4 border-transparent border-t-stone-900 dark:border-t-stone-100" />
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full relative">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out ${
                      isHighest
                        ? 'bg-gradient-to-t from-rose-500 to-rose-400 dark:from-rose-600 dark:to-rose-500'
                        : 'bg-gradient-to-t from-stone-300 to-stone-200 dark:from-stone-700 dark:to-stone-600 group-hover:from-rose-300 group-hover:to-rose-200 dark:group-hover:from-rose-800 dark:group-hover:to-rose-700'
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: '8px',
                      animationDelay: `${index * 50}ms`,
                    }}
                  />
                </div>

                {/* Date label */}
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">
                  {formatDate(day.date)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-rose-500 to-rose-400" />
          <span className="text-xs text-stone-600 dark:text-stone-400">Highest day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-stone-300 to-stone-200 dark:from-stone-700 dark:to-stone-600" />
          <span className="text-xs text-stone-600 dark:text-stone-400">Other days</span>
        </div>
      </div>
    </div>
  )
}
