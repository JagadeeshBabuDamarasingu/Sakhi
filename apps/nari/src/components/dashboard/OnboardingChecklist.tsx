import { LuCircleCheckBig, LuCircle, LuArrowRight } from 'react-icons/lu'
import type { OnboardingStep } from './types'

interface OnboardingChecklistProps {
  steps: OnboardingStep[]
  onComplete?: (stepId: string) => void
  onNavigateTo?: (section: string) => void
}

export function OnboardingChecklist({ steps, onNavigateTo }: OnboardingChecklistProps) {
  const completedCount = steps.filter((s) => s.completed).length
  const total = steps.length

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-4">
        <p className="text-white font-semibold text-sm">Get started</p>
        <p className="text-rose-100 text-xs mt-0.5">
          {completedCount} of {total} steps complete
        </p>
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="divide-y divide-base-300">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => !step.completed && onNavigateTo?.(step.targetSection)}
            disabled={step.completed}
            className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-base-200 disabled:cursor-default disabled:hover:bg-transparent transition-colors"
          >
            {step.completed ? (
              <LuCircleCheckBig className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            ) : (
              <LuCircle className="w-5 h-5 text-base-content/30 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p
                className={`text-sm font-medium leading-tight ${
                  step.completed
                    ? 'text-base-content/40 line-through'
                    : 'text-base-content'
                }`}
              >
                {step.title}
              </p>
              {!step.completed && (
                <p className="text-xs text-base-content/60 mt-0.5">
                  {step.description}
                </p>
              )}
            </div>
            {!step.completed && (
              <LuArrowRight className="w-4 h-4 text-base-content/40 shrink-0 mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
