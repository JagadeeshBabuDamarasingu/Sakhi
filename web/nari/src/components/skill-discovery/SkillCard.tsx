'use client'

import type { Skill, RelatedCourse } from './types'
import {
  LuCircleCheckBig as CheckCircle2,
  LuClock as Clock,
  LuCircleAlert as AlertCircle,
  LuShield as Shield,
  LuTrendingUp as TrendingUp,
  LuTrendingDown as TrendingDown,
  LuMinus as Minus,
  LuIndianRupee as IndianRupee,
  LuBookOpen as BookOpen,
  LuShoppingBag as ShoppingBag,
  LuEllipsisVertical as MoreVertical,
  LuTrash2 as Trash2,
  LuPenLine as Edit3,
} from 'react-icons/lu'
import { useState } from 'react'

interface SkillCardProps {
  skill: Skill
  relatedCourses?: RelatedCourse[]
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onValidate?: () => void
  onViewCourse?: (courseId: string) => void
  onViewListing?: (listingId: string) => void
}

const validationStatusConfig = {
  verified: {
    icon: CheckCircle2,
    label: 'Verified',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
  },
  'auto-verified': {
    icon: Shield,
    label: 'Auto-verified',
    className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-400',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
  },
  unverified: {
    icon: AlertCircle,
    label: 'Unverified',
    className: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400',
  },
}

const proficiencyConfig = {
  beginner: { label: 'Beginner', bars: 1 },
  intermediate: { label: 'Intermediate', bars: 2 },
  advanced: { label: 'Advanced', bars: 3 },
  expert: { label: 'Expert', bars: 4 },
}

const demandConfig = {
  low: { label: 'Low Demand', className: 'text-stone-500' },
  medium: { label: 'Medium Demand', className: 'text-amber-600 dark:text-amber-400' },
  high: { label: 'High Demand', className: 'text-emerald-600 dark:text-emerald-400' },
  'very-high': { label: 'Very High Demand', className: 'text-rose-600 dark:text-rose-400' },
}

const trendConfig = {
  rising: { icon: TrendingUp, label: 'Rising', className: 'text-emerald-600 dark:text-emerald-400' },
  stable: { icon: Minus, label: 'Stable', className: 'text-stone-500' },
  falling: { icon: TrendingDown, label: 'Falling', className: 'text-rose-600 dark:text-rose-400' },
}

export function SkillCard({
  skill,
  relatedCourses = [],
  onView,
  onEdit,
  onDelete,
  onValidate,
  onViewCourse,
  onViewListing,
}: SkillCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const statusConfig = validationStatusConfig[skill.validationStatus]
  const StatusIcon = statusConfig.icon
  const proficiency = proficiencyConfig[skill.proficiencyLevel]
  const demand = demandConfig[skill.marketDemand]
  const trend = trendConfig[skill.demandTrend]
  const TrendIcon = trend.icon

  const linkedCourses = relatedCourses.filter((c) => skill.relatedCourses.includes(c.id))

  const formatEarning = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`
    }
    return amount.toString()
  }

  const needsValidation = skill.validationStatus === 'pending' || skill.validationStatus === 'unverified'

  return (
    <div
      className="group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:border-rose-200 dark:hover:border-rose-800/50"
      onClick={onView}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 truncate pr-2">
              {skill.name}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{skill.category}</p>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-300 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit?.()
                    setShowMenu(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.()
                    setShowMenu(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </span>

          {needsValidation && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onValidate?.()
              }}
              className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 underline underline-offset-2"
            >
              Validate now
            </button>
          )}
        </div>

        {/* Proficiency Bars */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-stone-500 dark:text-stone-400">Proficiency</span>
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
              {proficiency.label}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`h-1.5 flex-1 rounded-full ${
                  bar <= proficiency.bars
                    ? 'bg-gradient-to-r from-rose-400 to-rose-500'
                    : 'bg-stone-200 dark:bg-stone-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Earning Potential */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-900/20 dark:to-rose-900/20 rounded-xl mb-4">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Earning Potential</p>
            <p className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center">
              <IndianRupee className="w-4 h-4" />
              {formatEarning(skill.earningPotential.min)} - {formatEarning(skill.earningPotential.max)}
              <span className="text-xs font-normal text-stone-500 ml-1">/month</span>
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-medium ${demand.className}`}>{demand.label}</p>
            <p className={`text-xs flex items-center gap-0.5 justify-end mt-0.5 ${trend.className}`}>
              <TrendIcon className="w-3 h-3" />
              {trend.label}
            </p>
          </div>
        </div>

        {/* Related Items */}
        <div className="flex items-center gap-4 text-sm">
          {linkedCourses.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewCourse?.(linkedCourses[0].id)
              }}
              className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>{linkedCourses.length} Course{linkedCourses.length > 1 ? 's' : ''}</span>
            </button>
          )}

          {skill.relatedListings.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewListing?.(skill.relatedListings[0])
              }}
              className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{skill.relatedListings.length} Listing{skill.relatedListings.length > 1 ? 's' : ''}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
