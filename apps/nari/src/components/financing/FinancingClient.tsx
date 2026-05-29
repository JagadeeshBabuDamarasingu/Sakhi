'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FinancingDashboard } from './FinancingDashboard'
import type { LenderOffer, Loan, LoanType, Testimonial, UserFinancingProfile } from './types'
import { HiOutlineSparkles, HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2'

interface FinancingData {
  userFinancingProfile: UserFinancingProfile
  loans: Loan[]
  lenderOffers: LenderOffer[]
  testimonials: Testimonial[]
}

interface CoachResult {
  message: string
  nextStep: {
    toolName: 'start_loan_application'
    requiresConfirmation: true
    arguments: { loanType: LoanType; amount?: number; tenure?: number }
  }
}

export function FinancingClient({ data }: { data: FinancingData }) {
  const router = useRouter()
  const [coachResult, setCoachResult] = useState<CoachResult | null>(null)
  const [coachDismissed, setCoachDismissed] = useState(false)
  const [pendingLoanType, setPendingLoanType] = useState<LoanType | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    fetch('/api/ai/finance/coach', { method: 'POST' })
      .then((res) => (res.ok ? res.json() : null))
      .then((result: CoachResult | null) => {
        if (result?.message) setCoachResult(result)
      })
      .catch(() => {})
  }, [])

  const handleApplyForLoan = useCallback(async (type: LoanType) => {
    const res = await fetch('/api/finance/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
    if (!res.ok) return

    const { applicationId } = await res.json()
    router.push(`/finance/apply/${applicationId}`)
  }, [router])

  const handlePayEmi = useCallback(async (loanId: string) => {
    const res = await fetch(`/api/finance/loans/${loanId}/pay`, { method: 'POST' })
    if (res.ok) router.refresh()
  }, [router])

  const handleEarlyRepayment = useCallback((loanId: string) => {
    router.push(`/finance/loans/${loanId}/close`)
  }, [router])

  const handleManageMandate = useCallback((loanId: string) => {
    router.push(`/finance/loans/${loanId}/mandate`)
  }, [router])

  const handleDownloadDocument = useCallback(async (loanId: string, type: 'statement' | 'noc') => {
    const res = await fetch(`/api/finance/loans/${loanId}/${type}`)
    if (!res.ok) return

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${loanId}-${type}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }, [])

  const handleCheckEligibility = useCallback(async () => {
    const res = await fetch('/api/finance/eligibility')
    if (res.ok) router.push('/finance/eligibility')
  }, [router])

  const handleAcceptCreditLadder = useCallback(async () => {
    const res = await fetch('/api/finance/profile', { method: 'POST' })
    if (res.ok) router.refresh()
  }, [router])

  const handleCoachStartLoan = useCallback(() => {
    if (coachResult?.nextStep?.arguments.loanType) {
      setPendingLoanType(coachResult.nextStep.arguments.loanType)
    }
  }, [coachResult])

  const handleConfirmLoan = useCallback(async () => {
    if (!pendingLoanType) return
    setConfirmLoading(true)
    try {
      await handleApplyForLoan(pendingLoanType)
    } finally {
      setConfirmLoading(false)
      setPendingLoanType(null)
    }
  }, [pendingLoanType, handleApplyForLoan])

  return (
    <>
      {coachResult && !coachDismissed && (
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 flex items-start gap-3 px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-2xl">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mt-0.5">
            <HiOutlineSparkles className="w-4 h-4 text-primary" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
              AI Financing Advisor
            </p>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {coachResult.message}
            </p>
            {coachResult.nextStep?.requiresConfirmation && (
              <button
                onClick={handleCoachStartLoan}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <HiOutlineCheckCircle className="w-4 h-4" />
                Review{' '}
                {coachResult.nextStep.arguments.loanType
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
                options
              </button>
            )}
          </div>
          <button
            onClick={() => setCoachDismissed(true)}
            className="flex-shrink-0 p-1 rounded-lg text-base-content/50 hover:text-base-content/80 hover:bg-base-200 transition-colors"
            aria-label="Dismiss"
          >
            <HiOutlineXMark className="w-4 h-4" />
          </button>
        </div>
      )}

      <FinancingDashboard
        {...data}
        onApplyForLoan={handleApplyForLoan}
        onPayEmi={handlePayEmi}
        onEarlyRepayment={handleEarlyRepayment}
        onManageMandate={handleManageMandate}
        onDownloadDocument={handleDownloadDocument}
        onCheckEligibility={handleCheckEligibility}
        onAcceptCreditLadder={handleAcceptCreditLadder}
      />

      {/* Confirmation modal for AI-suggested loan start */}
      {pendingLoanType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center">
                <HiOutlineExclamationCircle className="w-5 h-5 text-amber-500" />
              </span>
              <div>
                <p className="text-xs font-medium text-warning uppercase tracking-wide">
                  AI Action · High Risk · Needs Confirmation
                </p>
                <p className="font-semibold text-base-content mt-0.5">
                  Start Loan Application
                </p>
              </div>
            </div>

            <p className="text-sm text-base-content/70 mb-2">
              This will start a{' '}
              <strong className="text-base-content">
                {pendingLoanType.replace(/-/g, ' ')}
              </strong>{' '}
              application flow. No loan will be submitted or accepted until you review and confirm
              each step yourself.
            </p>
            <p className="text-xs text-base-content/50 mb-5">
              The AI advisor does not guarantee approval, income, or specific loan terms.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setPendingLoanType(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-base-300 text-sm font-medium text-base-content/80 hover:bg-base-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLoan}
                disabled={confirmLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {confirmLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <HiOutlineCheckCircle className="w-4 h-4" />
                )}
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
