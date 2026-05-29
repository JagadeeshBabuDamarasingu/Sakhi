'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineXCircle,
} from 'react-icons/hi2'

interface MandateInfo {
  loanId: string
  active: boolean
  debitDay: number
  upiId: string
  mandateRef: string | null
}

const DAYS = Array.from({ length: 28 }, (_, i) => i + 1)

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export function MandateClient({ mandate: initial }: { mandate: MandateInfo }) {
  const router = useRouter()
  const [mandate, setMandate] = useState(initial)
  const [selectedDay, setSelectedDay] = useState(initial.debitDay)
  const [saving, setSaving] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const isDirty = selectedDay !== mandate.debitDay

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/finance/loans/${mandate.loanId}/mandate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ debitDay: selectedDay }),
      })
      if (!res.ok) return
      const updated: MandateInfo = await res.json()
      setMandate(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }, [mandate.loanId, selectedDay])

  const handleCancel = useCallback(async () => {
    setCancelling(true)
    try {
      const res = await fetch(`/api/finance/loans/${mandate.loanId}/mandate`, {
        method: 'DELETE',
      })
      if (!res.ok) return
      setCancelled(true)
    } finally {
      setCancelling(false)
    }
  }, [mandate.loanId])

  if (cancelled) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-6">
            <HiOutlineXCircle className="w-10 h-10 text-base-content/40" />
          </div>
          <h1 className="text-xl font-bold text-base-content mb-2">
            Autopay cancelled
          </h1>
          <p className="text-sm text-base-content/40 mb-8 leading-relaxed">
            Your UPI Autopay mandate has been cancelled. You will need to pay each EMI manually.
          </p>
          <button
            onClick={() => router.push('/finance')}
            className="w-full px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl transition-colors text-sm"
          >
            Back to my loans
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Link
        href="/finance"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-8 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Financing
      </Link>

      <h1 className="text-xl font-bold text-base-content mb-1">
        UPI Autopay mandate
      </h1>
      <p className="text-sm text-base-content/40 mb-8">
        Your EMIs are automatically debited each month.
      </p>

      {/* Mandate status card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5 mb-5 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              mandate.active
                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                : 'bg-base-200'
            }`}
          >
            {mandate.active ? (
              <HiOutlineShieldCheck className="w-5 h-5 text-emerald-500" />
            ) : (
              <HiOutlineXCircle className="w-5 h-5 text-base-content/40" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-base-content">
              {mandate.active ? 'Autopay active' : 'Autopay cancelled'}
            </p>
            <p className="text-xs text-base-content/40 mt-0.5">
              {mandate.upiId}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/40">UPI ID</span>
            <span className="font-medium text-base-content/80">{mandate.upiId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/40">Debit day</span>
            <span className="font-medium text-base-content/80">
              {ordinal(mandate.debitDay)} of each month
            </span>
          </div>
          {mandate.mandateRef && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/40">Mandate ref</span>
              <span className="font-mono text-xs font-medium text-base-content/80">
                {mandate.mandateRef}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Change debit day */}
      {mandate.active && (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-5 mb-5 shadow-sm">
          <h2 className="text-sm font-semibold text-base-content/80 mb-4">
            Change debit day
          </h2>

          <div className="grid grid-cols-7 gap-2 mb-5">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-xl text-xs font-semibold transition-all ${
                  selectedDay === day
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-base-200 text-base-content/60 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm">
                <HiOutlineCheckCircle className="w-4 h-4" />
                Saved!
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {saving && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isDirty
                ? `Set debit to ${ordinal(selectedDay)}`
                : 'No changes'}
            </button>
          </div>
        </div>
      )}

      {/* Cancel mandate */}
      {mandate.active && !showCancelConfirm && (
        <button
          onClick={() => setShowCancelConfirm(true)}
          className="w-full py-3 text-sm font-medium text-base-content/40 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          Cancel Autopay mandate
        </button>
      )}

      {mandate.active && showCancelConfirm && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <HiOutlineExclamationTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                Cancel Autopay?
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
                If you cancel the mandate, you must pay each EMI manually by the due date. Missed
                payments will be reported to the credit bureau.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCancelConfirm(false)}
              className="flex-1 py-2.5 text-sm font-medium text-base-content/70 bg-base-100 border border-base-300 rounded-xl hover:bg-base-200 transition-colors"
            >
              Keep Autopay
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {cancelling && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              Yes, cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
