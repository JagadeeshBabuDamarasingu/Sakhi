import type { KeywordRanking } from './types'

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
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-base-300">
        <div>
          <h3 className="text-lg font-semibold text-base-content">Keyword Rankings</h3>
          <p className="text-sm text-base-content/60 mt-0.5">Your search visibility</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-base-content/60">
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
      <div className="divide-y divide-base-300">
        {rankings.map((ranking) => {
          const isTop3 = ranking.rank <= 3
          const isImproving = ranking.change > 0
          const isDecreasing = ranking.change < 0

          return (
            <div
              key={ranking.keyword}
              className="flex items-center gap-4 p-4 hover:bg-base-200 transition-colors"
            >
              {/* Rank */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isTop3
                    ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm'
                    : 'bg-base-200 text-base-content/70'
                }`}
              >
                #{ranking.rank}
              </div>

              {/* Keyword Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-base-content truncate">
                  {ranking.keyword}
                </p>
                <p className="text-xs text-base-content/60 mt-0.5">
                  {formatNumber(ranking.searchVolume)} monthly searches
                </p>
              </div>

              {/* Change Indicator */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  isImproving
                    ? 'bg-success/15 text-success'
                    : isDecreasing
                      ? 'bg-error/15 text-error'
                      : 'bg-base-200 text-base-content/70'
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
      <div className="p-4 bg-base-200 border-t border-base-300">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-xs text-base-content/70 leading-relaxed">
            <span className="font-semibold text-base-content">Pro tip:</span> Add your top keywords to product titles and descriptions to improve rankings.
          </p>
        </div>
      </div>
    </div>
  )
}
