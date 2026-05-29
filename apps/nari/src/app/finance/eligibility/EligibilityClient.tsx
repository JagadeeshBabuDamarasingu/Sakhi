'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
} from 'react-icons/hi2'
import type { LoanType } from '@/components/financing/types'

interface EligibilityResult {
  eligible: boolean
  creditLimit: number
  consentRequired: boolean
  message: string
}

const LOAN_TYPES: Array<{
  type: LoanType
  icon: string
  label: string
  sub: string
  desc: string
}> = [
  { type: 'micro-loan', icon: '📦', label: 'Micro-loan', sub: '₹2K – ₹50K', desc: 'For inventory & supplies' },
  { type: 'course-financing', icon: '📚', label: 'Course EMI', sub: '0% interest', desc: 'Unlock any course now' },
  { type: 'business-expansion', icon: '🏗️', label: 'Business Loan', sub: '₹50K+', desc: 'Scale your operations' },
]

function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function EligibilityClient({ eligibility }: { eligibility: EligibilityResult }) {
  const router = useRouter()
  const [loading, setLoading] = useState<LoanType | null>(null)

  const handleApply = useCallback(
    async (type: LoanType) => {
      setLoading(type)
      try {
        const res = await fetch('/api/finance/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type }),
        })
        if (!res.ok) return
        const { applicationId } = await res.json()
        router.push(`/finance/apply/${applicationId}`)
      } finally {
        setLoading(null)
      }
    },
    [router]
  )

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Link
        href="/finance"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-8 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Financing
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-8 text-white shadow-lg shadow-rose-200 dark:shadow-rose-950 mb-6">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative">
          {eligibility.eligible ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <HiOutlineCheckCircle className="w-8 h-8" />
              </div>
              <p className="text-rose-200 text-sm mb-1">You qualify for up to</p>
              <p className="text-5xl font-bold tracking-tight mb-2">
                {formatINR(eligibility.creditLimit)}
              </p>
              <p className="text-rose-200 text-sm">
                OCEN-verified lenders · No collateral needed
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <HiOutlineExclamationCircle className="w-8 h-8" />
              </div>
              <p className="text-2xl font-bold mb-2">Not eligible yet</p>
              <p className="text-rose-200 text-sm leading-relaxed">{eligibility.message}</p>
            </>
          )}
        </div>
      </div>

      {/* Info / consent notice */}
      {eligibility.eligible && (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-5 mb-6">
          <p className="text-sm text-base-content/60 leading-relaxed">
            {eligibility.message}
          </p>
          {eligibility.consentRequired && (
            <div className="mt-3 flex items-start gap-2.5 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠️</span>
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                KYC verification is required before funds are released. You'll be prompted to
                consent to an Aadhaar-based check during the application.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loan type cards */}
      {eligibility.eligible && (
        <section>
          <h2 className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">
            Choose a loan type
          </h2>
          <div className="space-y-3">
            {LOAN_TYPES.map(({ type, icon, label, sub, desc }) => (
              <button
                key={type}
                onClick={() => handleApply(type)}
                disabled={loading !== null}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-base-300 bg-base-100 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50/40 dark:hover:bg-rose-900/10 transition-all text-left group disabled:opacity-60"
              >
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-base-content group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                    {label}
                    <span className="ml-2 text-xs font-semibold text-rose-500 dark:text-rose-400">
                      {sub}
                    </span>
                  </p>
                  <p className="text-xs text-base-content/40 mt-0.5">{desc}</p>
                </div>
                {loading === type ? (
                  <span className="w-5 h-5 border-2 border-stone-300 border-t-rose-500 rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <HiOutlineArrowRight className="w-4 h-4 text-base-content/30 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Trust signals */}
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
            <span className="text-xs text-base-content/40">🏛️ RBI registered lenders</span>
            <span className="text-xs text-base-content/25">·</span>
            <span className="text-xs text-base-content/40">No collateral needed</span>
            <span className="text-xs text-base-content/25">·</span>
            <span className="text-xs text-base-content/40">Funds in 2–6 hours</span>
            <span className="text-xs text-base-content/25">·</span>
            <span className="text-xs text-base-content/40">No hidden charges</span>
          </div>
        </section>
      )}

      {/* Ineligible CTA */}
      {!eligibility.eligible && (
        <div className="text-center">
          <Link
            href="/finance"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl transition-colors text-sm"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Financing
          </Link>
        </div>
      )}
    </div>
  )
}
