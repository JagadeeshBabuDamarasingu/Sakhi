interface StatCardProps {
  label: string
  value: string
  change: number
  icon: 'currency' | 'orders' | 'views' | 'conversion'
  accentColor: 'rose' | 'amber' | 'stone'
}

const iconMap = {
  currency: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  orders: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  ),
  views: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  ),
  conversion: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  ),
}

const colorMap = {
  rose: {
    bg: 'bg-primary/10',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    border: 'border-primary/15',
  },
  amber: {
    bg: 'bg-secondary/20',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    border: 'border-secondary/20',
  },
  stone: {
    bg: 'bg-base-200',
    iconBg: 'bg-base-200',
    iconColor: 'text-base-content/70',
    border: 'border-base-300',
  },
}

export function StatCard({ label, value, change, icon, accentColor }: StatCardProps) {
  const colors = colorMap[accentColor]
  const isPositive = change >= 0

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-4 sm:p-5 transition-all hover:shadow-lg hover:shadow-stone-900/5 dark:hover:shadow-stone-900/20`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
            <svg className={`w-5 h-5 ${colors.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {iconMap[icon]}
            </svg>
          </div>
          <div
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
              isPositive
                ? 'text-success bg-success/15'
                : 'text-error bg-error/15'
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isPositive ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            {Math.abs(change)}%
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
            {value}
          </p>
          <p className="text-sm text-base-content/70">{label}</p>
        </div>
      </div>
    </div>
  )
}
