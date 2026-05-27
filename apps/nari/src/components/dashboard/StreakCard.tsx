import type { Streak } from './types'

interface StreakCardProps {
  streak: Streak
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-base-content/60 uppercase tracking-widest">
          Learning streak
        </p>
        <span className="text-lg" role="img" aria-label="fire">🔥</span>
      </div>

      <div className="flex items-end gap-1.5 mb-4">
        <span className="text-4xl font-bold text-secondary leading-none">
          {streak.currentDays}
        </span>
        <span className="text-sm text-base-content/40 mb-1">days</span>
      </div>

      <div className="flex gap-1">
        {streak.weekActivity.map((active, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`h-7 w-full rounded-lg transition-colors ${
                active
                  ? 'bg-secondary shadow-sm shadow-secondary/20'
                  : 'bg-base-200'
              }`}
            />
            <span className="text-[10px] font-medium text-base-content/30">
              {DAY_LABELS[i]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-base-content/40 mt-3">
        Best streak:{' '}
        <span className="font-semibold text-base-content/60">
          {streak.longestDays} days
        </span>
      </p>
    </div>
  )
}
