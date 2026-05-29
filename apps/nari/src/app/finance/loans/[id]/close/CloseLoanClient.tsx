'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from 'react-icons/hi2'
import type { Loan } from '@/components/financing/types'

function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface ClosureQuote {
  loanId: string
  status: string
  amountDue: number
  validUntil: string
}

const LOAN_LABELS: Record<string, string> = {
  'micro-loan': 'Micro-loan',
  'course-financing': 'Course EMI',
  'business-expansion': 'Business Loan',
}

export function CloseLoanClient({ loan }: { loan: Loan }) {
  const router = useRouter()
  const [quote, setQuote] = useState<ClosureQuote | null>(null)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const handleGetQuote = useCallback(async () => {
    setLoadingQuote(true)
    try {
      const res = await fetch(`/api/finance/loans/${loan.id}/close`, { method: 'POST' })
      if (!res.ok) return
      setQuote(await res.json())
    } finally {
      setLoadingQuote(false)
    }
  }, [loan.id])

  const handleConfirm = useCallback(async () => {
    if (!quote) return
    setConfirming(true)
    try {
      // In production this would trigger payment + closure. For now just mark done.
      await new Promise((r) => setTimeout(r, 800))
      setDone(true)
    } finally {
      setConfirming(false)
    }
  }, [quote])

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <HiOutlineCheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            Loan closed!
          </h1>
          <p className="text-base-content/50 mb-2">
            {LOAN_LABELS[loan.type] ?? loan.type} · {formatINR(loan.amount)}
          </p>
          <p className="text-sm text-base-content/40 mb-8 leading-relaxed">
            Your loan has been fully repaid. The NOC document will be available
            in your loan history within 24 hours.
          </p>

          <button
            onClick={() => router.push('/finance')}
            className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl transition-colors text-sm"
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
        Close loan early
      </h1>
      <p className="text-sm text-base-content/40 mb-8">
        Pay off your outstanding balance in full to close this loan ahead of schedule.
      </p>

      {/* Loan summary card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5 mb-5 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest mb-0.5">
              {LOAN_LABELS[loan.type] ?? loan.type}
            </p>
            <p className="text-sm font-medium text-base-content/80">
              {loan.purpose}
            </p>
            <p className="text-xs text-base-content/40 mt-0.5">
              {loan.lenderName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-stone-100">
          <div>
            <p className="text-xs text-base-content/40 mb-0.5">Outstanding balance</p>
            <p className="text-2xl font-bold text-base-content">
              {formatINR(loan.outstandingBalance)}
            </p>
          </div>
          <div>
            <p className="text-xs text-base-content/40 mb-0.5">EMIs remaining</p>
            <p className="text-2xl font-bold text-base-content">
              {loan.totalEmis - loan.emisPaid}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-base-content/40">
              {loan.emisPaid} of {loan.totalEmis} EMIs paid
            </span>
            <span className="font-semibold text-base-content/70">
              {Math.round((loan.emisPaid / loan.totalEmis) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-base-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full"
              style={{ width: `${(loan.emisPaid / loan.totalEmis) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl mb-6">
        <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
          Early closure may incur a foreclosure charge as per your loan agreement. The exact amount
          will be confirmed in the closure quote below.
        </p>
      </div>

      {/* Closure quote */}
      {quote ? (
        <div className="bg-base-100 border border-rose-200 dark:border-rose-800/50 rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-4">
            Closure quote
          </p>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-base-content/40 mb-0.5">Total amount due</p>
              <p className="text-3xl font-bold text-base-content">
                {formatINR(quote.amountDue)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <HiOutlineClock className="w-4 h-4" />
              <span className="text-xs font-medium">
                Valid until {formatDate(quote.validUntil)}
              </span>
            </div>
          </div>
          <p className="text-xs text-base-content/40 mb-5">
            Paying this amount via UPI will close your loan immediately. The NOC document will be
            generated within 24 hours.
          </p>

          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {confirming && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Pay {formatINR(quote.amountDue)} &amp; close loan
          </button>
        </div>
      ) : (
        <button
          onClick={handleGetQuote}
          disabled={loadingQuote}
          className="w-full py-3.5 bg-neutral text-neutral-content hover:bg-neutral/80 font-semibold text-sm rounded-2xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loadingQuote && (
            <span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />
          )}
          Get closure quote
        </button>
      )}
    </div>
  )
}
