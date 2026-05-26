import { LuBrain, LuTrendingUp, LuBookOpen, LuShoppingBag, LuZap } from 'react-icons/lu'
import type { DashboardMetrics, AgentAction, Streak } from './types'

interface SummaryCardProps {
  metrics: DashboardMetrics
  agentActions: AgentAction[]
  streak: Streak
  onNavigateTo?: (section: string) => void
}

function formatCurrency(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`
  return `₹${amount}`
}

export function SummaryCard({ metrics, agentActions, streak, onNavigateTo }: SummaryCardProps) {
  const activeAgents = agentActions.length
  const earningsGrowth =
    metrics.earningsLastMonth > 0
      ? Math.round(
          ((metrics.earningsThisMonth - metrics.earningsLastMonth) / metrics.earningsLastMonth) * 100
        )
      : 0
  const growing = earningsGrowth >= 0

  const items = [
    {
      icon: <LuTrendingUp className="w-4 h-4" />,
      label: 'Earnings',
      value: formatCurrency(metrics.earningsThisMonth),
      sub: `${growing ? '+' : ''}${earningsGrowth}% vs last month`,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      section: 'marketplace',
    },
    {
      icon: <LuBrain className="w-4 h-4" />,
      label: 'AI Agents',
      value: String(activeAgents),
      sub: 'active actions',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      section: 'ai-orchestration',
    },
    {
      icon: <LuBookOpen className="w-4 h-4" />,
      label: 'Courses',
      value: String(metrics.activeCoursesCount),
      sub: 'in progress',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      section: 'elearning',
    },
    {
      icon: <LuShoppingBag className="w-4 h-4" />,
      label: 'Orders',
      value: String(metrics.pendingOrdersCount),
      sub: 'pending',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      section: 'marketplace',
    },
  ]

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-2 mb-3">
        <LuZap className="w-4 h-4 text-rose-500" />
        <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">At a glance</h2>
        {streak.currentDays > 0 && (
          <span className="ml-auto text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
            🔥 {streak.currentDays}-day streak
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigateTo?.(item.section)}
            className={`flex flex-col gap-1 rounded-xl p-3 text-left transition-opacity hover:opacity-80 ${item.bg}`}
          >
            <span className={item.color}>{item.icon}</span>
            <span className={`text-lg font-bold leading-none ${item.color}`}>{item.value}</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{item.label}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 leading-tight">{item.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
