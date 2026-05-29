'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckBadge,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import type { LenderOffer } from '@/components/financing/types'

function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

interface OfferComparisonClientProps {
  applicationId: string
  offers: LenderOffer[]
}

export function OfferComparisonClient({ offers }: OfferComparisonClientProps) {
  const router = useRouter()
  const [selecting, setSelecting] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [nextStep, setNextStep] = useState<string | null>(null)

  const sorted = [...offers].sort((a, b) => {
    if (a.isRecommended && !b.isRecommended) return -1
    if (!a.isRecommended && b.isRecommended) return 1
    return a.effectiveAnnualRate - b.effectiveAnnualRate
  })

  const handleSelect = useCallback(
    async (offerId: string) => {
      setSelecting(offerId)
      try {
        const res = await fetch(`/api/financing/offers/${offerId}/select`, { method: 'POST' })
        if (!res.ok) return
        const data = await res.json()
        setSelected(offerId)
        setNextStep(data.disbursalTime ?? null)
      } finally {
        setSelecting(null)
      }
    },
    []
  )

  if (selected) {
    const offer = offers.find((o) => o.id === selected)
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <HiOutlineCheckBadge className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            Offer accepted!
          </h1>
          <p className="text-base-content/50 mb-1">
            {offer?.lenderName}
          </p>
          <p className="text-3xl font-bold text-base-content mb-1">
            {offer ? formatINR(offer.loanAmount) : ''}
          </p>
          <p className="text-sm text-base-content/40 mb-8">
            at {offer?.effectiveAnnualRate}% p.a. · {offer?.tenure} months
          </p>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-5 mb-8 text-left">
            <div className="flex items-center gap-3 mb-2">
              <HiOutlineClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Estimated disbursal
              </p>
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm pl-8">
              {nextStep ?? offer?.disbursalTime ?? 'Within 6 hours'}
            </p>
          </div>

          <p className="text-xs text-base-content/40 mb-6">
            Next: e-sign the loan agreement and set up UPI Autopay mandate.
            <br />
            These steps will be sent to your registered mobile number.
          </p>

          <button
            onClick={() => router.push('/financing')}
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
        href="/financing"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-8 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Cancel application
      </Link>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-base-content mb-1">
          Compare lender offers
        </h1>
        <p className="text-sm text-base-content/40">
          {sorted.length} offer{sorted.length !== 1 ? 's' : ''} from RBI-registered lenders ·
          offers expire in 24 hrs
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((offer) => (
          <div
            key={offer.id}
            className={`rounded-2xl border overflow-hidden bg-base-100 shadow-sm transition-all ${
              offer.isRecommended
                ? 'border-rose-300 dark:border-rose-700 ring-1 ring-rose-300 dark:ring-rose-700'
                : 'border-base-300'
            }`}
          >
            {/* Recommended badge */}
            {offer.isRecommended && (
              <div className="bg-rose-500 px-4 py-1.5 flex items-center gap-2">
                <HiOutlineCheckBadge className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  Best match for you
                </span>
              </div>
            )}

            <div className="p-5">
              {/* Lender header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold text-base-content text-sm">
                    {offer.lenderName}
                  </p>
                  <p className="text-xs text-base-content/40 mt-0.5">
                    RBI Reg: {offer.rbiRegistration}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <HiOutlineShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified
                  </span>
                </div>
              </div>

              {/* Key numbers */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-base-content/40 mb-0.5">Loan amount</p>
                  <p className="text-xl font-bold text-base-content">
                    {formatINR(offer.loanAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-base-content/40 mb-0.5">Monthly EMI</p>
                  <p className="text-xl font-bold text-base-content">
                    {formatINR(offer.emiAmount)}
                  </p>
                </div>
              </div>

              {/* Detail rows */}
              <div className="bg-base-200/60 rounded-xl p-3 space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/40">Interest rate (p.a.)</span>
                  <span className="font-medium text-base-content/80">
                    {offer.interestRate}% ({offer.effectiveAnnualRate}% EAR)
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/40">Tenure</span>
                  <span className="font-medium text-base-content/80">
                    {offer.tenure} months
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/40">Total repayment</span>
                  <span className="font-medium text-base-content/80">
                    {formatINR(offer.totalRepayment)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/40">Processing fee</span>
                  <span className="font-medium text-base-content/80">
                    {offer.processingFee === 0 ? 'Nil' : formatINR(offer.processingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/40">Estimated disbursal</span>
                  <span className="font-medium text-base-content/80">
                    {offer.disbursalTime}
                  </span>
                </div>
              </div>

              {/* Guarantees row */}
              <div className="flex gap-3 mb-4">
                {offer.noCollateral && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full font-medium">
                    ✓ No collateral
                  </span>
                )}
                {offer.noGuarantor && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full font-medium">
                    ✓ No guarantor
                  </span>
                )}
              </div>

              <button
                onClick={() => handleSelect(offer.id)}
                disabled={selecting !== null}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                  offer.isRecommended
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-base-200 hover:bg-base-200 text-base-content'
                }`}
              >
                {selecting === offer.id ? (
                  <span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />
                ) : null}
                Select this offer
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-base-content/40 text-center mt-6">
        Powered by OCEN · All lenders are RBI registered · No hidden charges
      </p>
    </div>
  )
}
