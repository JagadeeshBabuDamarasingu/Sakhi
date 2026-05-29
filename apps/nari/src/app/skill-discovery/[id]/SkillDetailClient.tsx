'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckBadge,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineDocumentText,
  HiOutlineVideoCamera,
  HiOutlineBriefcase,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineCheckCircle,
} from 'react-icons/hi2'
import type { Skill, ValidationStatus, ProficiencyLevel, ValidationMethod } from '@/components/skill-discovery/types'

const VALIDATION_STYLES: Record<ValidationStatus, { badge: string; label: string; icon: React.ReactNode }> = {
  verified: {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    label: 'Verified',
    icon: <HiOutlineCheckBadge className="w-4 h-4" />,
  },
  'auto-verified': {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    label: 'Auto-verified',
    icon: <HiOutlineCheckBadge className="w-4 h-4" />,
  },
  pending: {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    label: 'Pending review',
    icon: <HiOutlineClock className="w-4 h-4" />,
  },
  unverified: {
    badge: 'bg-stone-100 text-base-content/50',
    label: 'Unverified',
    icon: <HiOutlineSparkles className="w-4 h-4" />,
  },
}

const PROFICIENCY_LEVELS: ProficiencyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert']

const PROFICIENCY_BAR: Record<ProficiencyLevel, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const DEMAND_LABEL: Record<string, { label: string; color: string }> = {
  'very-high': { label: 'Very high demand', color: 'text-emerald-600 dark:text-emerald-400' },
  high: { label: 'High demand', color: 'text-emerald-600 dark:text-emerald-400' },
  medium: { label: 'Medium demand', color: 'text-amber-600 dark:text-amber-400' },
  low: { label: 'Low demand', color: 'text-base-content/40' },
}

const METHOD_ICONS: Record<string, React.ReactNode> = {
  'ai-assessment': <HiOutlineSparkles className="w-5 h-5" />,
  document: <HiOutlineDocumentText className="w-5 h-5" />,
  video: <HiOutlineVideoCamera className="w-5 h-5" />,
}

export function SkillDetailClient({
  skill: initial,
  validationMethods,
}: {
  skill: Skill
  validationMethods: ValidationMethod[]
}) {
  const router = useRouter()
  const [skill, setSkill] = useState(initial)

  // Edit state
  const [editing, setEditing] = useState(false)
  const [editProficiency, setEditProficiency] = useState(initial.proficiencyLevel)
  const [editYears, setEditYears] = useState(initial.yearsOfExperience)
  const [editDescription, setEditDescription] = useState(initial.description)
  const [editSaving, setEditSaving] = useState(false)

  // Validation state
  const [validating, setValidating] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<ValidationMethod | null>(null)
  const [validationSubmitting, setValidationSubmitting] = useState(false)
  const [validationDone, setValidationDone] = useState(false)

  // Delete state
  const [deleting, setDeleting] = useState(false)

  const handleSaveEdit = useCallback(async () => {
    setEditSaving(true)
    try {
      const res = await fetch(`/api/skills/${skill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proficiencyLevel: editProficiency,
          yearsOfExperience: editYears,
          description: editDescription,
        }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setSkill(updated)
      setEditing(false)
    } finally {
      setEditSaving(false)
    }
  }, [skill.id, editProficiency, editYears, editDescription])

  const handleValidate = useCallback(async () => {
    if (!selectedMethod) return
    setValidationSubmitting(true)
    try {
      const res = await fetch(`/api/skills/${skill.id}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedMethod.type }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setSkill(updated)
      setValidationDone(true)
    } finally {
      setValidationSubmitting(false)
    }
  }, [skill.id, selectedMethod])

  const handleDelete = useCallback(async () => {
    if (!confirm(`Remove "${skill.name}" from your profile?`)) return
    setDeleting(true)
    await fetch(`/api/skills/${skill.id}`, { method: 'DELETE' })
    router.push('/skill-discovery')
  }, [skill.id, skill.name, router])

  const vstyle = VALIDATION_STYLES[skill.validationStatus]
  const demand = DEMAND_LABEL[skill.marketDemand] ?? DEMAND_LABEL.medium
  const proficiencyPct = PROFICIENCY_BAR[skill.proficiencyLevel]

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/skill-discovery"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Skill Discovery
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/80 via-primary to-primary/90 p-8 text-white mb-5 shadow-xl shadow-primary/20">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${vstyle.badge}`}>
                {vstyle.icon}
                {vstyle.label}
              </span>
              <span className="text-xs text-white/70 bg-white/15 px-2.5 py-1 rounded-full">{skill.category}</span>
            </div>
            <h1 className="text-2xl font-bold leading-snug mb-2">{skill.name}</h1>
            <p className="text-white/70 text-sm leading-relaxed">{skill.description}</p>
          </div>
        </div>

        {/* Proficiency & experience */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Proficiency</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-base-content capitalize">{skill.proficiencyLevel}</span>
            <span className="text-xs text-base-content/40">{skill.yearsOfExperience} yr{skill.yearsOfExperience !== 1 ? 's' : ''} experience</span>
          </div>
          <div className="h-2.5 bg-base-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700"
              style={{ width: `${proficiencyPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-base-content/30">
            {PROFICIENCY_LEVELS.map((l) => (
              <span key={l} className={skill.proficiencyLevel === l ? 'text-primary font-semibold' : ''}>{l.charAt(0).toUpperCase() + l.slice(1)}</span>
            ))}
          </div>
        </div>

        {/* Earning potential */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Earning potential</p>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl font-bold text-base-content">
              ₹{skill.earningPotential.min.toLocaleString('en-IN')}
            </span>
            <span className="text-base-content/40 text-sm mb-1">–</span>
            <span className="text-2xl font-bold text-base-content">
              ₹{skill.earningPotential.max.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-base-content/40 mb-1">/ {skill.earningPotential.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${demand.color}`}>{demand.label}</span>
            <span className="text-base-content/20">·</span>
            <span className={`flex items-center gap-1 text-xs ${
              skill.demandTrend === 'rising'
                ? 'text-emerald-600 dark:text-emerald-400'
                : skill.demandTrend === 'falling'
                ? 'text-red-500'
                : 'text-base-content/40'
            }`}>
              {skill.demandTrend === 'rising' ? (
                <HiOutlineArrowTrendingUp className="w-3.5 h-3.5" />
              ) : skill.demandTrend === 'falling' ? (
                <HiOutlineArrowTrendingDown className="w-3.5 h-3.5" />
              ) : null}
              {skill.demandTrend.charAt(0).toUpperCase() + skill.demandTrend.slice(1)} trend
            </span>
          </div>
        </div>

        {/* Related courses */}
        {skill.relatedCourses.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Related courses</p>
            <div className="space-y-2">
              {skill.relatedCourses.map((courseId) => (
                <Link
                  key={courseId}
                  href={`/elearning/courses/${courseId}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBriefcase className="w-4 h-4 text-rose-500" />
                  </div>
                  <span className="text-sm text-base-content/80 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {courseId}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related marketplace listings */}
        {skill.relatedListings.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Marketplace listings</p>
            <div className="space-y-2">
              {skill.relatedListings.map((listingId) => (
                <Link
                  key={listingId}
                  href={`/marketplace/listings/${listingId}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBriefcase className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-sm text-base-content/80 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {listingId}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Validate */}
        {skill.validationStatus === 'unverified' && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-1">Get verified</p>
            <p className="text-xs text-base-content/40 mb-4">
              Verified skills earn up to 3× more trust from clients and buyers.
            </p>
            {validationDone ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <HiOutlineCheckCircle className="w-5 h-5" />
                Submitted for review — you&apos;ll be notified when verified.
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {validationMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(selectedMethod?.id === method.id ? null : method)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                        selectedMethod?.id === method.id
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-stone-100 hover:border-stone-200 dark:hover:border-stone-600'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedMethod?.id === method.id ? 'bg-primary/15 text-primary' : 'bg-base-200 text-base-content/40'
                      }`}>
                        {METHOD_ICONS[method.type ?? ''] ?? <HiOutlineDocumentText className="w-5 h-5" />}
                      </span>
                      <div>
                        <p className={`text-sm font-medium ${selectedMethod?.id === method.id ? 'text-primary' : 'text-base-content/80'}`}>
                          {method.name}
                        </p>
                        <p className="text-xs text-base-content/40">{method.description} · {method.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setValidating(true) }}
                  disabled={!selectedMethod}
                  className="w-full py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold text-sm rounded-xl disabled:opacity-50 transition-all"
                >
                  Start verification
                </button>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => {
              setEditProficiency(skill.proficiencyLevel)
              setEditYears(skill.yearsOfExperience)
              setEditDescription(skill.description)
              setEditing(true)
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-base-100 ring-1 ring-base-300 text-base-content/80 font-medium text-sm rounded-2xl hover:ring-stone-300 transition-all"
          >
            <HiOutlinePencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-sm rounded-2xl transition-colors disabled:opacity-50"
          >
            <HiOutlineTrash className="w-4 h-4" />
            Remove
          </button>
        </div>

        {skill.addedAt && (
          <p className="text-xs text-center text-base-content/35">
            Added {new Date(skill.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {skill.verifiedAt && (
              <> · Verified {new Date(skill.verifiedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</>
            )}
          </p>
        )}
      </div>

      {/* ── Edit modal ── */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <div>
                <p className="text-xs text-base-content/40 uppercase tracking-widest">Edit skill</p>
                <p className="font-semibold text-base-content">{skill.name}</p>
              </div>
              <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content/70 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Proficiency</label>
                <select
                  value={editProficiency}
                  onChange={(e) => setEditProficiency(e.target.value as ProficiencyLevel)}
                  className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {PROFICIENCY_LEVELS.map((l) => (
                    <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Years of experience</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={editYears}
                  onChange={(e) => setEditYears(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <button onClick={() => setEditing(false)} className="flex-1 py-2.5 border border-base-300 text-base-content/70 text-sm font-medium rounded-xl hover:bg-base-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={editSaving}
                className="flex-1 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold text-sm rounded-xl disabled:opacity-60"
              >
                {editSaving ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Validation confirmation modal ── */}
      {validating && selectedMethod && !validationDone && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <div>
                <p className="text-xs text-base-content/40 uppercase tracking-widest">Verify skill</p>
                <p className="font-semibold text-base-content">{selectedMethod.name}</p>
              </div>
              <button onClick={() => setValidating(false)} className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content/70 transition-colors">✕</button>
            </div>
            <div className="p-5">
              <p className="text-sm text-base-content/60 leading-relaxed mb-6">
                {selectedMethod.description}. This takes {selectedMethod.duration}. Your skill will show as <strong className="text-amber-600">Pending</strong> until our team reviews it.
              </p>
              <button
                onClick={handleValidate}
                disabled={validationSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold text-sm rounded-xl disabled:opacity-60"
              >
                {validationSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : 'Submit for review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
