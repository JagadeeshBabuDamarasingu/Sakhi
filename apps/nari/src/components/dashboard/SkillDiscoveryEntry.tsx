import { LuSparkles, LuArrowRight } from 'react-icons/lu'

interface SkillDiscoveryEntryProps {
  onNavigateTo?: (section: string) => void
}

export function SkillDiscoveryEntry({ onNavigateTo }: SkillDiscoveryEntryProps) {
  return (
    <button
      onClick={() => onNavigateTo?.('skills')}
      className="w-full text-left bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-4 shadow-sm shadow-violet-200 dark:shadow-none group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <LuSparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Discover Skills</p>
            <p className="text-violet-100 text-xs mt-0.5">
              Find new skills matched to your goals
            </p>
          </div>
        </div>
        <LuArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  )
}
