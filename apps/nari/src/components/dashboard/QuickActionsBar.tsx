import { LuBookOpen, LuShoppingBag, LuLandmark, LuSparkles } from 'react-icons/lu'

interface QuickActionsBarProps {
  onNavigateTo?: (section: string) => void
}

const ACTIONS = [
  {
    Icon: LuBookOpen,
    label: 'Resume course',
    section: 'elearning',
    color: 'text-primary',
    bg: 'bg-primary/10',
    hoverBg: 'hover:bg-primary/15',
  },
  {
    Icon: LuShoppingBag,
    label: 'Add product',
    section: 'marketplace',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    hoverBg: 'hover:bg-secondary/20',
  },
  {
    Icon: LuLandmark,
    label: 'Check loan',
    section: 'financing',
    color: 'text-success',
    bg: 'bg-success/15',
    hoverBg: 'hover:bg-success/20',
  },
  {
    Icon: LuSparkles,
    label: 'Assess skills',
    section: 'skill-discovery',
    color: 'text-info',
    bg: 'bg-info/15',
    hoverBg: 'hover:bg-info/20',
  },
] as const

export function QuickActionsBar({ onNavigateTo }: QuickActionsBarProps) {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-sm dark:shadow-none">
      <p className="text-[11px] font-semibold text-base-content/60 uppercase tracking-widest mb-3">
        Quick actions
      </p>
      <div className="grid grid-cols-4 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.Icon
          return (
            <button
              key={action.section}
              onClick={() => onNavigateTo?.(action.section)}
              className={`flex flex-col items-center gap-2 py-3 px-1 rounded-xl transition-colors ${action.hoverBg}`}
            >
              <span
                className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${action.color}`} />
              </span>
              <span className="text-[10px] font-medium text-base-content/70 text-center leading-tight">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
