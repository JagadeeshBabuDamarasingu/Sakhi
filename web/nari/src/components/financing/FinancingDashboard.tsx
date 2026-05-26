'use client'

import { useState } from 'react'
import type { FinancingProps, Loan, LoanType, Testimonial } from './types'

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatShortINR(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${amount}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

const LOAN_TYPE_META: Record<LoanType, { icon: string; label: string; sub: string; desc: string }> = {
  'micro-loan': { icon: '📦', label: 'Micro-loan', sub: '₹2K – ₹50K', desc: 'For inventory & supplies' },
  'course-financing': { icon: '📚', label: 'Course EMI', sub: '0% interest', desc: 'Unlock any course now' },
  'business-expansion': { icon: '🏗️', label: 'Business Loan', sub: '₹50K+', desc: 'Scale your operations' },
}

// ─── Loan Card ────────────────────────────────────────────────────────────────

interface LoanCardProps {
  loan: Loan
  onPayEmi?: () => void
  onEarlyRepayment?: () => void
  onManageMandate?: () => void
  onDownloadDocument?: (type: 'statement' | 'noc') => void
}

function LoanCard({ loan, onPayEmi, onEarlyRepayment, onManageMandate, onDownloadDocument }: LoanCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isClosed = loan.status === 'closed'
  const progress = (loan.emisPaid / loan.totalEmis) * 100

  const statusStyle = {
    'on-track': { badge: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30', dot: 'bg-emerald-500', bar: 'bg-emerald-500', label: 'On track' },
    'due-soon': { badge: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30', dot: 'bg-amber-500', bar: 'bg-amber-500', label: 'Due soon' },
    'overdue': { badge: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30', dot: 'bg-red-500', bar: 'bg-red-500', label: 'Overdue' },
    'closed': { badge: 'text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800', dot: 'bg-stone-400', bar: 'bg-stone-400', label: 'Closed' },
  }[loan.repaymentStatus]

  const meta = LOAN_TYPE_META[loan.type]

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      isClosed
        ? 'border-stone-200 dark:border-stone-700/50 bg-stone-50 dark:bg-stone-900/40'
        : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-sm'
    }`}>
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="text-xl mt-0.5 flex-shrink-0">{meta.icon}</span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">{meta.label}</p>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-snug">{loan.purpose}</p>
            </div>
          </div>
          <span className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {statusStyle.label}
          </span>
        </div>

        {/* Amount row */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">
              {isClosed ? 'Total repaid' : 'Outstanding'}
            </p>
            <p className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
              {isClosed ? formatINR(loan.totalRepayment) : formatINR(loan.outstandingBalance)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Loan amount</p>
            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">{formatINR(loan.amount)}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-stone-400 dark:text-stone-500">{loan.emisPaid} of {loan.totalEmis} EMIs paid</span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${statusStyle.bar}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Milestone */}
        {loan.milestoneReached === 'halfway' && !isClosed && (
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-xl">
            <span>🎉</span>
            Halfway there! You're doing great.
          </div>
        )}
        {loan.milestoneReached === 'closed' && isClosed && (
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl">
            <span>✅</span>
            Fully repaid · Great credit history!
          </div>
        )}

        {/* Next EMI info */}
        {!isClosed && loan.nextEmiDate && (
          <div className={`flex items-center justify-between p-3 rounded-xl ${
            loan.repaymentStatus === 'due-soon'
              ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              : 'bg-stone-50 dark:bg-stone-800/60'
          }`}>
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500">Next EMI</p>
              <p className="text-sm font-semibold text-stone-800 dark:text-white">
                {formatINR(loan.nextEmiAmount!)} · {formatDate(loan.nextEmiDate)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400 dark:text-stone-500">Lender</p>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {loan.lenderName.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          </div>
        )}

        {/* Closed date */}
        {isClosed && loan.closedAt && (
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Closed {formatDate(loan.closedAt)} · {loan.lenderName}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-5 pb-5 flex flex-wrap gap-2">
        {!isClosed && (
          <>
            <button
              onClick={onPayEmi}
              className="flex-1 min-w-0 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Pay Now
            </button>
            <button
              onClick={() => setExpanded(v => !v)}
              aria-expanded={expanded}
              className="px-4 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors"
            >
              {expanded ? 'Hide' : 'Schedule'}
            </button>
            <button
              onClick={onManageMandate}
              title="Manage UPI Autopay"
              className="px-3 py-2.5 text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </>
        )}
        {isClosed && (
          <>
            {loan.nocAvailable && (
              <button
                onClick={() => onDownloadDocument?.('noc')}
                className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-medium rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download NOC
              </button>
            )}
            <button
              onClick={() => onDownloadDocument?.('statement')}
              className="px-4 py-2.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            >
              Statement
            </button>
          </>
        )}
      </div>

      {/* Expanded EMI schedule */}
      {expanded && !isClosed && (
        <div className="border-t border-stone-100 dark:border-stone-800 px-5 py-4">
          <p className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
            EMI Schedule
          </p>
          <div className="space-y-2.5">
            {loan.emiSchedule.map((emi) => {
              const isPaid = emi.status === 'paid'
              const isDueSoon = emi.status === 'due-soon'
              const isOverdue = emi.status === 'overdue'
              return (
                <div key={emi.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    isPaid ? 'bg-emerald-500 text-white' :
                    isDueSoon ? 'bg-amber-500 text-white' :
                    isOverdue ? 'bg-red-500 text-white' :
                    'border-2 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500'
                  }`}>
                    {isPaid ? '✓' : emi.installmentNumber}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm ${isPaid ? 'text-stone-400 dark:text-stone-600 line-through' : 'text-stone-700 dark:text-stone-300'}`}>
                      {formatDate(emi.dueDate)}
                    </span>
                    {isDueSoon && <span className="ml-2 text-xs text-amber-600 dark:text-amber-400 font-medium">Due soon</span>}
                    {isOverdue && <span className="ml-2 text-xs text-red-600 dark:text-red-400 font-medium">Overdue</span>}
                  </div>
                  <span className={`text-sm font-semibold ${isPaid ? 'text-stone-400 dark:text-stone-600' : 'text-stone-800 dark:text-white'}`}>
                    {formatINR(emi.amount)}
                  </span>
                </div>
              )
            })}
          </div>
          <button
            onClick={onEarlyRepayment}
            className="mt-4 w-full text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 py-2 transition-colors"
          >
            Close loan early →
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="min-w-[272px] max-w-[272px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 flex-shrink-0">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-sm font-bold text-rose-600 dark:text-rose-400 flex-shrink-0">
          {testimonial.avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-800 dark:text-white truncate">{testimonial.name}</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 truncate">{testimonial.business}</p>
          <p className="text-xs text-stone-400 dark:text-stone-500">{testimonial.location}</p>
        </div>
      </div>
      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
        "{testimonial.quote}"
      </p>
      {testimonial.quoteTranslation && (
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 leading-relaxed">
          ({testimonial.quoteTranslation})
        </p>
      )}
      <div className="mt-3 inline-flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 rounded-full px-2.5 py-1">
        <span className="text-xs">{LOAN_TYPE_META[testimonial.loanType].icon}</span>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {formatShortINR(testimonial.loanAmount)} {LOAN_TYPE_META[testimonial.loanType].label.toLowerCase()}
        </span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinancingDashboard({
  userFinancingProfile,
  loans,
  testimonials,
  onApplyForLoan,
  onPayEmi,
  onEarlyRepayment,
  onManageMandate,
  onDownloadDocument,
  onCheckEligibility,
  onAcceptCreditLadder,
}: FinancingProps) {
  const activeLoans = loans.filter(l => l.status === 'active' || l.status === 'overdue')
  const closedLoans = loans.filter(l => l.status === 'closed')
  const totalOutstanding = activeLoans.reduce((sum, l) => sum + l.outstandingBalance, 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

      {/* ── Hero credit card ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-6 text-white shadow-lg shadow-rose-200 dark:shadow-rose-950">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
              🏦 OCEN Powered
            </span>
            {userFinancingProfile.kycStatus === 'verified' && (
              <span className="text-xs font-semibold bg-emerald-500/80 px-2.5 py-1 rounded-full">
                ✓ KYC Verified
              </span>
            )}
          </div>

          {activeLoans.length > 0 ? (
            <div>
              <p className="text-rose-200 text-sm mb-1">Total outstanding</p>
              <p className="text-4xl font-bold tracking-tight mb-1">{formatINR(totalOutstanding)}</p>
              <p className="text-rose-200 text-sm">across {activeLoans.length} active loan{activeLoans.length > 1 ? 's' : ''}</p>
            </div>
          ) : (
            <div>
              <p className="text-rose-200 text-sm mb-1">Your credit limit</p>
              <p className="text-4xl font-bold tracking-tight mb-4">
                {formatINR(userFinancingProfile.creditLimit)}
              </p>
              <button
                onClick={onCheckEligibility}
                className="bg-white text-rose-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-rose-50 transition-colors"
              >
                Check eligibility →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Credit ladder banner ── */}
      {userFinancingProfile.creditLadder.active && (
        <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
          <span className="text-2xl flex-shrink-0">⬆️</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Credit upgrade available!</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 leading-relaxed">
              {userFinancingProfile.creditLadder.message}
            </p>
          </div>
          <button
            onClick={onAcceptCreditLadder}
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Claim
          </button>
        </div>
      )}

      {/* ── Active loans ── */}
      {activeLoans.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
            Active Loans
          </h2>
          <div className="space-y-4">
            {activeLoans.map(loan => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onPayEmi={() => onPayEmi?.(loan.id)}
                onEarlyRepayment={() => onEarlyRepayment?.(loan.id)}
                onManageMandate={() => onManageMandate?.(loan.id)}
                onDownloadDocument={(type) => onDownloadDocument?.(loan.id, type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Get a new loan ── */}
      <section>
        <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
          Get a New Loan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.entries(LOAN_TYPE_META) as [LoanType, typeof LOAN_TYPE_META[LoanType]][]).map(([type, meta]) => (
            <button
              key={type}
              onClick={() => onApplyForLoan?.(type)}
              className="text-left p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50/40 dark:hover:bg-rose-900/10 transition-all group shadow-sm"
            >
              <span className="text-2xl mb-2 block">{meta.icon}</span>
              <p className="text-sm font-semibold text-stone-800 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                {meta.label}
              </p>
              <p className="text-xs font-semibold text-rose-500 dark:text-rose-400">{meta.sub}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{meta.desc}</p>
            </button>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
            🏛️ RBI registered lenders
          </span>
          <span className="text-xs text-stone-300 dark:text-stone-700">·</span>
          <span className="text-xs text-stone-400 dark:text-stone-500">No collateral needed</span>
          <span className="text-xs text-stone-300 dark:text-stone-700">·</span>
          <span className="text-xs text-stone-400 dark:text-stone-500">Funds in 2–6 hours</span>
          <span className="text-xs text-stone-300 dark:text-stone-700">·</span>
          <span className="text-xs text-stone-400 dark:text-stone-500">No hidden charges</span>
        </div>
      </section>

      {/* ── Past loans ── */}
      {closedLoans.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
            Past Loans
          </h2>
          <div className="space-y-3">
            {closedLoans.map(loan => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onDownloadDocument={(type) => onDownloadDocument?.(loan.id, type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
            What women say
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
            {testimonials.map(t => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <div className="text-center py-4 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs text-stone-400 dark:text-stone-500">
          Powered by OCEN · All lenders are RBI registered · No hidden charges
        </p>
      </div>

    </div>
  )
}
