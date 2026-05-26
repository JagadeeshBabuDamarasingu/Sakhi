import { LuTrendingUp, LuTrendingDown, LuShoppingBag, LuBookOpen, LuLandmark } from 'react-icons/lu'
import type { DashboardMetrics } from './types'

interface MetricsRowProps {
  metrics: DashboardMetrics
}

function formatCurrency(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`
  return `₹${amount}`
}

const loanStatusConfig: Record<
  DashboardMetrics['loanStatus'],
  { label: string; color: string; dot: string }
> = {
  active: { label: 'Active Loan', color: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  eligible: { label: 'Eligible', color: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  pending: { label: 'Under Review', color: 'text-stone-500 dark:text-stone-400', dot: 'bg-stone-400' },
  'not-eligible': { label: 'Not Eligible', color: 'text-stone-400', dot: 'bg-stone-300' },
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  const earningsGrowth =
    metrics.earningsLastMonth > 0
      ? Math.round(
          ((metrics.earningsThisMonth - metrics.earningsLastMonth) / metrics.earningsLastMonth) * 100
        )
      : 0
  const growing = earningsGrowth >= 0
  const loanConfig = loanStatusConfig[metrics.loanStatus]

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-4 text-white shadow-sm shadow-rose-200 dark:shadow-none">
        <div className="flex items-center justify-between mb-3">
          <p className="text-rose-100 text-xs font-medium">This month</p>
          <LuTrendingUp className="w-4 h-4 text-rose-200" />
        </div>
        <p className="text-2xl font-bold tracking-tight">
          {formatCurrency(metrics.earningsThisMonth)}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {growing ? (
            <LuTrendingUp className="w-3 h-3 text-rose-200" />
          ) : (
            <LuTrendingDown className="w-3 h-3 text-rose-200" />
          )}
          <p className="text-xs text-rose-100">
            {growing ? '+' : ''}
            {earningsGrowth}% vs last month
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-4 text-white shadow-sm shadow-amber-200 dark:shadow-none">
        <div className="flex items-center justify-between mb-3">
          <p className="text-amber-100 text-xs font-medium">Pending orders</p>
          <LuShoppingBag className="w-4 h-4 text-amber-200" />
        </div>
        <p className="text-2xl font-bold tracking-tight">{metrics.pendingOrdersCount}</p>
        <p className="text-xs text-amber-100 mt-1">
          {metrics.pendingOrdersCount === 0 ? 'All caught up!' : 'Awaiting fulfillment'}
        </p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-3">
          <p className="text-stone-500 dark:text-stone-400 text-xs font-medium">Active courses</p>
          <LuBookOpen className="w-4 h-4 text-stone-300 dark:text-stone-600" />
        </div>
        <p className="text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
          {metrics.activeCoursesCount}
        </p>
        <p className="text-xs text-stone-400 mt-1">In progress</p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-3">
          <p className="text-stone-500 dark:text-stone-400 text-xs font-medium">Loan</p>
          <LuLandmark className="w-4 h-4 text-stone-300 dark:text-stone-600" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`h-2 w-2 rounded-full shrink-0 ${loanConfig.dot}`} />
          <p className={`text-sm font-bold leading-none ${loanConfig.color}`}>
            {loanConfig.label}
          </p>
        </div>
        {metrics.activeLoanBalance !== undefined && (
          <p className="text-xs text-stone-400 mt-1">
            {formatCurrency(metrics.activeLoanBalance)} remaining
          </p>
        )}
        {metrics.nextRepaymentDate && (
          <p className="text-xs text-stone-400 mt-0.5">
            Due{' '}
            {new Date(metrics.nextRepaymentDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
