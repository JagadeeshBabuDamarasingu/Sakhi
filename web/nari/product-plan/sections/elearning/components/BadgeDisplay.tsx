import type { Badge } from '../types'

interface BadgeDisplayProps {
  badges: Badge[]
  onShare?: (badgeId: string) => void
}

export function BadgeDisplay({ badges, onShare }: BadgeDisplayProps) {
  if (badges.length === 0) return null

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-stone-900 dark:text-white">
          Your Badges
        </h3>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {badges.length} earned
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="group relative"
          >
            {/* Badge circle */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm ring-2 ring-amber-300 transition-all hover:scale-110 hover:shadow-md dark:from-amber-900/40 dark:to-amber-800/40 dark:ring-amber-600">
              {/* Badge icon */}
              <div className="text-amber-600 dark:text-amber-400">
                {badge.title === 'Safety Champion' ? (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) : badge.title === 'First Steps' ? (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                )}
              </div>

              {/* Share button (on hover) */}
              <button
                onClick={() => onShare?.(badge.id)}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-md transition-all group-hover:scale-100"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 scale-0 rounded-lg bg-stone-900 px-3 py-2 text-center opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 dark:bg-stone-700">
              <p className="whitespace-nowrap text-sm font-medium text-white">
                {badge.title}
              </p>
              <p className="whitespace-nowrap text-xs text-stone-400">
                {formatDate(badge.earnedAt)}
              </p>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-stone-900 dark:bg-stone-700" />
            </div>
          </div>
        ))}

        {/* Placeholder for unearned badges */}
        {[...Array(Math.max(0, 5 - badges.length))].map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-stone-200 dark:border-stone-700"
          >
            <svg className="h-6 w-6 text-stone-300 dark:text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
