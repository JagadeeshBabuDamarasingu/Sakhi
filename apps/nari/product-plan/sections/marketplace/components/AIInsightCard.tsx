import type { AIInsight, InsightType } from '../types'

interface AIInsightCardProps {
  insight: AIInsight
  onAction?: () => void
}

const typeStyles: Record<InsightType, { bg: string; border: string; iconBg: string; iconColor: string; buttonBg: string; buttonText: string }> = {
  opportunity: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-900/50',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
    buttonText: 'text-white',
  },
  alert: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900/50',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    buttonBg: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500',
    buttonText: 'text-white',
  },
  suggestion: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-900/50',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    buttonBg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500',
    buttonText: 'text-white',
  },
}

const typeIcons: Record<InsightType, JSX.Element> = {
  opportunity: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  ),
  alert: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  suggestion: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  ),
}

const typeLabels: Record<InsightType, string> = {
  opportunity: 'Opportunity',
  alert: 'Alert',
  suggestion: 'Suggestion',
}

export function AIInsightCard({ insight, onAction }: AIInsightCardProps) {
  const styles = typeStyles[insight.type]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} p-4 sm:p-5 transition-all hover:shadow-md group`}
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
            <svg className={`w-4 h-4 ${styles.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {typeIcons[insight.type]}
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wide ${styles.iconColor}`}>
                {typeLabels[insight.type]}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug">
              {insight.title}
            </h4>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
          {insight.description}
        </p>

        {/* Action Button */}
        <button
          onClick={onAction}
          className={`w-full ${styles.buttonBg} ${styles.buttonText} text-sm font-medium py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
        >
          {insight.action}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
