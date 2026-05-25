import { LuBookOpen, LuShoppingBag, LuLandmark, LuSparkles } from 'react-icons/lu'

interface QuickActionsBarProps {
  onNavigateTo?: (section: string) => void
}

const ACTIONS = [
  {
    Icon: LuBookOpen,
    label: 'Resume course',
    section: 'elearning',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    hoverBg: 'hover:bg-rose-100 dark:hover:bg-rose-950/60',
  },
  {
    Icon: LuShoppingBag,
    label: 'Add product',
    section: 'marketplace',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    hoverBg: 'hover:bg-amber-100 dark:hover:bg-amber-950/60',
  },
  {
    Icon: LuLandmark,
    label: 'Check loan',
    section: 'financing',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    hoverBg: 'hover:bg-emerald-100 dark:hover:bg-emerald-950/60',
  },
  {
    Icon: LuSparkles,
    label: 'Assess skills',
    section: 'skill-discovery',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-950/60',
  },
] as const

export function QuickActionsBar({ onNavigateTo }: QuickActionsBarProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm dark:shadow-none">
      <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-3">
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
              <span className="text-[10px] font-medium text-stone-600 dark:text-stone-400 text-center leading-tight">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
