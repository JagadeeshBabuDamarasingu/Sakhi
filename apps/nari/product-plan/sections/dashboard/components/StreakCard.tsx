import type { Streak } from '../types'

interface StreakCardProps {
  streak: Streak
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest">
          Learning streak
        </p>
        <span className="text-lg" role="img" aria-label="fire">🔥</span>
      </div>

      <div className="flex items-end gap-1.5 mb-4">
        <span className="text-4xl font-bold text-amber-500 leading-none">
          {streak.currentDays}
        </span>
        <span className="text-sm text-stone-400 mb-1">days</span>
      </div>

      {/* Week activity dots */}
      <div className="flex gap-1">
        {streak.weekActivity.map((active, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`h-7 w-full rounded-lg transition-colors ${
                active
                  ? 'bg-amber-400 shadow-sm shadow-amber-200 dark:shadow-none'
                  : 'bg-stone-100 dark:bg-stone-800'
              }`}
            />
            <span className="text-[10px] font-medium text-stone-400 dark:text-stone-600">
              {DAY_LABELS[i]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 mt-3">
        Best streak: <span className="font-semibold text-stone-500 dark:text-stone-400">{streak.longestDays} days</span>
      </p>
    </div>
  )
}
