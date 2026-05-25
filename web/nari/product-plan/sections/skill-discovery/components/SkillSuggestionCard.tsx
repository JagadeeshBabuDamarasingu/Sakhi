'use client'

import type { SkillSuggestion } from '../types'
import { LuSparkles as Sparkles, LuTrendingUp as TrendingUp, LuIndianRupee as IndianRupee, LuPlus as Plus, LuX as X } from 'react-icons/lu'

interface SkillSuggestionCardProps {
  suggestion: SkillSuggestion
  onAdd?: () => void
  onDismiss?: () => void
}

const demandConfig = {
  low: { label: 'Low', className: 'text-stone-500' },
  medium: { label: 'Medium', className: 'text-amber-600 dark:text-amber-400' },
  high: { label: 'High', className: 'text-emerald-600 dark:text-emerald-400' },
  'very-high': { label: 'Very High', className: 'text-rose-600 dark:text-rose-400' },
}

export function SkillSuggestionCard({ suggestion, onAdd, onDismiss }: SkillSuggestionCardProps) {
  const isAIRecommended = suggestion.suggestionType === 'ai-recommended'
  const demand = demandConfig[suggestion.marketDemand]

  const formatEarning = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`
    }
    return amount.toString()
  }

  return (
    <div className="relative group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 transition-all duration-200 hover:border-rose-200 dark:hover:border-rose-800/50 hover:shadow-md">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-300 opacity-0 group-hover:opacity-100 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Type Badge */}
      <div className="flex items-center gap-2 mb-3">
        {isAIRecommended ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-100 to-rose-100 text-violet-700 dark:from-violet-900/50 dark:to-rose-900/50 dark:text-violet-400">
            <Sparkles className="w-3 h-3" />
            AI Pick
            {suggestion.matchScore && (
              <span className="ml-1 text-rose-600 dark:text-rose-400">{suggestion.matchScore}%</span>
            )}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
            <TrendingUp className="w-3 h-3" />
            #{suggestion.trendingRank} Trending
          </span>
        )}
      </div>

      {/* Skill Name */}
      <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
        {suggestion.skillName}
      </h4>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">{suggestion.category}</p>

      {/* Reason */}
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
        {suggestion.reason}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className={`font-medium ${demand.className}`}>{demand.label} Demand</span>
        <span className="text-stone-600 dark:text-stone-400 flex items-center">
          <IndianRupee className="w-3 h-3" />
          {formatEarning(suggestion.earningPotential.min)}-{formatEarning(suggestion.earningPotential.max)}/mo
        </span>
      </div>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-rose-50 text-rose-600 font-medium text-sm hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add This Skill
      </button>
    </div>
  )
}
