import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: string
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 transition-all hover:shadow-md hover:ring-rose-200 dark:bg-stone-900 dark:ring-stone-800 dark:hover:ring-rose-800">
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-rose-100 to-amber-50 opacity-60 blur-2xl transition-transform group-hover:scale-150 dark:from-rose-900/30 dark:to-amber-900/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
          {icon}
        </div>
      </div>
    </div>
  )
}
