import { LuArrowRight as ArrowRight } from 'react-icons/lu'
import type { NextGoal } from '../types'

interface NextGoalCardProps {
  nextGoal: NextGoal
  onNavigateTo?: (section: string) => void
}

export function NextGoalCard({ nextGoal, onNavigateTo }: NextGoalCardProps) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - nextGoal.progressPercent / 100)

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm dark:shadow-none">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-rose-500 uppercase tracking-widest mb-1">
            Next goal
          </p>
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 leading-snug">
            {nextGoal.title}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            {nextGoal.description}
          </p>
        </div>
        {/* Progress ring */}
        <div className="relative w-14 h-14 shrink-0">
          <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-stone-100 dark:text-stone-800"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-rose-500 transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-rose-600 dark:text-rose-400">
            {nextGoal.progressPercent}%
          </span>
        </div>
      </div>
      <button
        onClick={() => onNavigateTo?.(nextGoal.targetSection)}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors"
      >
        {nextGoal.targetLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
