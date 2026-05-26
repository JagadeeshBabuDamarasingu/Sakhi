import { LuX, LuBell, LuTriangleAlert, LuCircleCheckBig } from 'react-icons/lu'
import type { Announcement } from './types'

interface AnnouncementsBarProps {
  announcements: Announcement[]
  onDismiss?: (id: string) => void
  onMarkRead?: (id: string) => void
}

const severityConfig = {
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    Icon: LuTriangleAlert,
    iconColor: 'text-amber-500',
  },
  info: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    Icon: LuBell,
    iconColor: 'text-rose-500',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    Icon: LuCircleCheckBig,
    iconColor: 'text-emerald-500',
  },
}

export function AnnouncementsBar({ announcements, onDismiss, onMarkRead }: AnnouncementsBarProps) {
  return (
    <div className="space-y-2">
      {announcements.map((ann) => {
        const config = severityConfig[ann.severity]
        const Icon = config.Icon
        return (
          <div
            key={ann.id}
            className={`rounded-2xl border ${config.bg} ${config.border} p-4 flex gap-3 items-start`}
          >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 leading-tight">
                {ann.title}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                {ann.message}
              </p>
              {ann.type === 'personalized' && (
                <span className="inline-block mt-1.5 text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded-full">
                  Personal alert
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onMarkRead?.(ann.id)
                onDismiss?.(ann.id)
              }}
              className="text-stone-300 hover:text-stone-500 dark:text-stone-600 dark:hover:text-stone-400 shrink-0 transition-colors"
              aria-label="Dismiss"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
