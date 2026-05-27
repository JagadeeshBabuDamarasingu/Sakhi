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
    className: 'badge badge-success badge-soft',
  },
  'auto-verified': {
    icon: Shield,
    label: 'Auto-verified',
    className: 'badge badge-info badge-soft',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'badge badge-secondary badge-soft',
  },
  unverified: {
    icon: AlertCircle,
    label: 'Unverified',
    className: 'badge badge-neutral badge-soft',
  },
}

const proficiencyConfig = {
  beginner: { label: 'Beginner', bars: 1 },
  intermediate: { label: 'Intermediate', bars: 2 },
  advanced: { label: 'Advanced', bars: 3 },
  expert: { label: 'Expert', bars: 4 },
}

const demandConfig = {
  low: { label: 'Low Demand', className: 'text-base-content/60' },
  medium: { label: 'Medium Demand', className: 'text-secondary' },
  high: { label: 'High Demand', className: 'text-success' },
  'very-high': { label: 'Very High Demand', className: 'text-primary' },
}

const trendConfig = {
  rising: { icon: TrendingUp, label: 'Rising', className: 'text-success' },
  stable: { icon: Minus, label: 'Stable', className: 'text-base-content/60' },
  falling: { icon: TrendingDown, label: 'Falling', className: 'text-primary' },
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
      className="group relative bg-base-100 rounded-2xl border border-base-300 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20"
      onClick={onView}
    >
      {/* Top accent line — kept as-is per spec */}
      <div className="h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-base-content truncate pr-2">
              {skill.name}
            </h3>
            <p className="text-sm text-base-content/60 mt-0.5">{skill.category}</p>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              aria-label="More options"
              className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-base-100 shadow-lg border border-base-300 rounded-box py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit?.()
                    setShowMenu(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-base-content hover:bg-base-200"
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
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-primary hover:bg-primary/10"
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
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </span>

          {needsValidation && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onValidate?.()
              }}
              className="text-xs font-medium text-primary hover:text-primary/80 underline underline-offset-2"
            >
              Validate now
            </button>
          )}
        </div>

        {/* Proficiency Bars */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-base-content/60">Proficiency</span>
            <span className="text-xs font-medium text-base-content">
              {proficiency.label}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`h-1.5 flex-1 rounded-full ${
                  bar <= proficiency.bars
                    ? 'bg-primary'
                    : 'bg-base-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Earning Potential */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl mb-4">
          <div>
            <p className="text-xs text-base-content/60 mb-0.5">Earning Potential</p>
            <p className="text-lg font-bold text-base-content flex items-center">
              <IndianRupee className="w-4 h-4" />
              {formatEarning(skill.earningPotential.min)} - {formatEarning(skill.earningPotential.max)}
              <span className="text-xs font-normal text-base-content/60 ml-1">/month</span>
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
              className="flex items-center gap-1.5 text-base-content/70 hover:text-primary transition-colors"
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
              className="flex items-center gap-1.5 text-base-content/70 hover:text-primary transition-colors"
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
