import { LuArrowRight } from 'react-icons/lu'
import type { NextGoal } from './types'

interface NextGoalCardProps {
  nextGoal: NextGoal
  onNavigateTo?: (section: string) => void
}

export function NextGoalCard({ nextGoal, onNavigateTo }: NextGoalCardProps) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - nextGoal.progressPercent / 100)

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm dark:shadow-none">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            Next goal
          </p>
          <p className="text-sm font-semibold text-base-content leading-snug">
            {nextGoal.title}
          </p>
          <p className="text-xs text-base-content/60 mt-1.5 leading-relaxed">
            {nextGoal.description}
          </p>
        </div>
        <div className="relative w-14 h-14 shrink-0">
          <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-base-content/10"
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
              className="text-primary transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
            {nextGoal.progressPercent}%
          </span>
        </div>
      </div>
      <button
        onClick={() => onNavigateTo?.(nextGoal.targetSection)}
        className="btn btn-primary mt-4 w-full rounded-xl py-2.5 text-sm"
      >
        {nextGoal.targetLabel}
        <LuArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
