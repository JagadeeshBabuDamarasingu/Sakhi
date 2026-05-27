import { LuX, LuBell, LuTriangleAlert, LuCircleCheckBig } from 'react-icons/lu'
import type { Announcement } from './types'

interface AnnouncementsBarProps {
  announcements: Announcement[]
  onDismiss?: (id: string) => void
  onMarkRead?: (id: string) => void
}

const severityConfig = {
  warning: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    Icon: LuTriangleAlert,
    iconColor: 'text-secondary',
  },
  info: {
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    Icon: LuBell,
    iconColor: 'text-primary',
  },
  success: {
    bg: 'bg-success/15',
    border: 'border-success/30',
    Icon: LuCircleCheckBig,
    iconColor: 'text-success',
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
              <p className="text-sm font-semibold text-base-content leading-tight">
                {ann.title}
              </p>
              <p className="text-xs text-base-content/60 mt-0.5 leading-relaxed">
                {ann.message}
              </p>
              {ann.type === 'personalized' && (
                <span className="inline-block mt-1.5 text-[10px] font-medium bg-base-200 text-base-content/60 px-2 py-0.5 rounded-full">
                  Personal alert
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onMarkRead?.(ann.id)
                onDismiss?.(ann.id)
              }}
              className="text-base-content/30 hover:text-base-content/60 shrink-0 transition-colors"
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
