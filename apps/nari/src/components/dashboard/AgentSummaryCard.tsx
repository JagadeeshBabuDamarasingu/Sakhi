'use client'

import { useState } from 'react'
import type { IconType } from 'react-icons'
import { LuArrowRight, LuZap, LuBookOpen, LuShoppingBag, LuCreditCard, LuSearch } from 'react-icons/lu'
import type { AgentAction, Recommendation } from './types'

interface AgentSummaryCardProps {
  agentActions: AgentAction[]
  recommendations: Recommendation[]
  onNavigateTo?: (section: string) => void
}

const actionTypeConfig: Record<
  AgentAction['type'],
  { Icon: IconType; color: string; bg: string }
> = {
  listing: { Icon: LuShoppingBag, color: 'text-secondary', bg: 'bg-secondary/10' },
  course: { Icon: LuBookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  financing: { Icon: LuCreditCard, color: 'text-success', bg: 'bg-success/15' },
  assessment: { Icon: LuSearch, color: 'text-info', bg: 'bg-info/15' },
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
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm dark:shadow-none">
      <div className="px-5 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <LuZap className="w-4 h-4 text-primary" />
          <p className="text-[11px] font-semibold text-base-content/60 uppercase tracking-widest">
            AI Agent
          </p>
        </div>
        <div className="flex border-b border-base-300">
          {(['actions', 'recs'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm font-medium pb-2.5 mr-5 border-b-2 transition-colors ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-base-content/40 hover:text-base-content/70'
              }`}
            >
              {t === 'actions' ? 'Recent actions' : 'Suggestions'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tab === 'actions' ? (
          agentActions.length === 0 ? (
            <p className="text-xs text-base-content/50 text-center py-4">No recent agent activity.</p>
          ) : (
            agentActions.slice(0, 4).map((action) => {
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
                    <p className="text-xs text-base-content/80 leading-relaxed">
                      {action.message}
                    </p>
                    <p className="text-[11px] text-base-content/50 mt-0.5">
                      {formatRelativeTime(action.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })
          )
        ) : (
          recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl bg-base-200 p-3 space-y-2"
            >
              <p className="text-xs text-base-content/80 leading-relaxed">
                {rec.message}
              </p>
              <div className="flex items-center justify-between gap-2">
                {rec.potentialBoost ? (
                  <span className="text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                    {rec.potentialBoost}
                  </span>
                ) : (
                  <span />
                )}
                <button
                  onClick={() => onNavigateTo?.(rec.targetSection)}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {rec.ctaLabel}
                  <LuArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
