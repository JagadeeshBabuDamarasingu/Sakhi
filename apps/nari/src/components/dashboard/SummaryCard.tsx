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
      color: 'text-primary',
      bg: 'bg-primary/10',
      section: 'marketplace',
    },
    {
      icon: <LuBrain className="w-4 h-4" />,
      label: 'AI Agents',
      value: String(activeAgents),
      sub: 'active actions',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      section: 'ai',
    },
    {
      icon: <LuBookOpen className="w-4 h-4" />,
      label: 'Courses',
      value: String(metrics.activeCoursesCount),
      sub: 'in progress',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      section: 'learn',
    },
    {
      icon: <LuShoppingBag className="w-4 h-4" />,
      label: 'Orders',
      value: String(metrics.pendingOrdersCount),
      sub: 'pending',
      color: 'text-success',
      bg: 'bg-success/15',
      section: 'marketplace',
    },
  ]

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-2 mb-3">
        <LuZap className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-base-content">At a glance</h2>
        {streak.currentDays > 0 && (
          <span className="ml-auto text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
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
            <span className="text-xs font-medium text-base-content/60">{item.label}</span>
            <span className="text-[10px] text-base-content/40 leading-tight">{item.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
