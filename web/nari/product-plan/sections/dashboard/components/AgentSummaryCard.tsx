import { useState } from 'react'
import { LuArrowRight as ArrowRight, LuZap as Zap, LuBookOpen as BookOpen, LuShoppingBag as ShoppingBag, LuCreditCard as CreditCard, LuSearch as Search } from 'react-icons/lu'
import type { AgentAction, Recommendation } from '../types'

interface AgentSummaryCardProps {
  agentActions: AgentAction[]
  recommendations: Recommendation[]
  onNavigateTo?: (section: string) => void
}

const actionTypeConfig: Record<
  AgentAction['type'],
  { Icon: typeof Zap; color: string; bg: string }
> = {
  listing: { Icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  course: { Icon: BookOpen, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  financing: { Icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  assessment: { Icon: Search, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
}

function formatRelativeTime(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays}d ago`
}

export function AgentSummaryCard({
  agentActions,
  recommendations,
  onNavigateTo,
}: AgentSummaryCardProps) {
  const [tab, setTab] = useState<'actions' | 'recs'>('actions')

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm dark:shadow-none">
      <div className="px-5 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-rose-500" />
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest">
            AI Agent
          </p>
        </div>
        {/* Tab bar */}
        <div className="flex border-b border-stone-100 dark:border-stone-800">
          {(['actions', 'recs'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm font-medium pb-2.5 mr-5 border-b-2 transition-colors ${
                tab === t
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
              }`}
            >
              {t === 'actions' ? 'Recent actions' : 'Suggestions'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tab === 'actions'
          ? agentActions.slice(0, 4).map((action) => {
              const config = actionTypeConfig[action.type]
              const Icon = config.Icon
              return (
                <div key={action.id} className="flex gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {action.message}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {formatRelativeTime(action.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })
          : recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl bg-stone-50 dark:bg-stone-800/60 p-3 space-y-2"
              >
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {rec.message}
                </p>
                <div className="flex items-center justify-between gap-2">
                  {rec.potentialBoost ? (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                      {rec.potentialBoost}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={() => onNavigateTo?.(rec.targetSection)}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    {rec.ctaLabel}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
