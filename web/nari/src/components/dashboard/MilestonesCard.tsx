import { LuLock } from 'react-icons/lu'
import type { Milestone } from './types'

interface MilestonesCardProps {
  milestones: Milestone[]
}

export function MilestonesCard({ milestones }: MilestonesCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm dark:shadow-none">
      <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-4">
        Achievements
      </p>
      <div className="grid grid-cols-3 gap-2">
        {milestones.map((m) => (
          <div
            key={m.id}
            title={m.description}
            className={`rounded-xl p-2.5 flex flex-col items-center gap-1.5 text-center transition-opacity ${
              m.earnedAt
                ? 'bg-amber-50 dark:bg-amber-950/30'
                : 'bg-stone-50 dark:bg-stone-800/50 opacity-50'
            }`}
          >
            {m.earnedAt ? (
              <span className="text-2xl leading-none" role="img" aria-label={m.title}>
                {m.icon}
              </span>
            ) : (
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-stone-200 dark:bg-stone-700">
                <LuLock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              </span>
            )}
            <span className="text-[10px] font-medium text-stone-600 dark:text-stone-400 leading-tight">
              {m.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
