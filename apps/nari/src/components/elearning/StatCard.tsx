import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: string
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-base-100 p-4 shadow-sm ring-1 ring-base-300 transition-all hover:shadow-md hover:ring-primary/20">
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 opacity-60 blur-2xl transition-transform group-hover:scale-150" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-base-content/60">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold text-base-content">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs font-medium text-success">
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  )
}
