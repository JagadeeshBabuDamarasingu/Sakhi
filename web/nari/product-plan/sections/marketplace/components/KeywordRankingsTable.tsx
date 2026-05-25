import type { KeywordRanking } from '../types'

interface KeywordRankingsTableProps {
  rankings: KeywordRanking[]
}

export function KeywordRankingsTable({ rankings }: KeywordRankingsTableProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Keyword Rankings</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Your search visibility</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search data
        </div>
      </div>

      {/* Table */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {rankings.map((ranking) => {
          const isTop3 = ranking.rank <= 3
          const isImproving = ranking.change > 0
          const isDecreasing = ranking.change < 0

          return (
            <div
              key={ranking.keyword}
              className="flex items-center gap-4 p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
            >
              {/* Rank */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isTop3
                    ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                #{ranking.rank}
              </div>

              {/* Keyword Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                  {ranking.keyword}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {formatNumber(ranking.searchVolume)} monthly searches
                </p>
              </div>

              {/* Change Indicator */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  isImproving
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                    : isDecreasing
                      ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {isImproving ? (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    +{ranking.change}
                  </>
                ) : isDecreasing ? (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    {ranking.change}
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                    0
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Tip */}
      <div className="p-4 bg-stone-50 dark:bg-stone-800/30 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Pro tip:</span> Add your top keywords to product titles and descriptions to improve rankings.
          </p>
        </div>
      </div>
    </div>
  )
}
