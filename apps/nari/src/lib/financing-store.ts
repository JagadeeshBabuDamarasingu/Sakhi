import sampleData from '../../product-plan/sections/financing/sample-data.json'
import type {
  LenderOffer,
  Loan,
  LoanType,
  Testimonial,
  UserFinancingProfile,
} from '@/components/financing/types'

type FinancingSeed = {
  userFinancingProfile: UserFinancingProfile
  loans: Loan[]
  lenderOffers: LenderOffer[]
  testimonials: Testimonial[]
}

const seed = sampleData as unknown as FinancingSeed

let userFinancingProfile = { ...seed.userFinancingProfile }
let loans = [...seed.loans]
let lenderOffers = [...seed.lenderOffers]
let testimonials = [...seed.testimonials]

const applicationOfferMap = new Map<string, LenderOffer[]>()

export function getFinancingProfile() {
  return userFinancingProfile
}

export function getFinancingLoans() {
  return [...loans]
}

export function getLenderOffers(applicationId?: string) {
  if (applicationId && applicationOfferMap.has(applicationId)) {
    return applicationOfferMap.get(applicationId) ?? []
  }

  return [...lenderOffers]
}

export function getFinancingTestimonials() {
  return [...testimonials]
}

export function getFinancingDashboardData() {
  return {
    userFinancingProfile,
    loans: getFinancingLoans(),
    lenderOffers: getLenderOffers(),
    testimonials: getFinancingTestimonials(),
  }
}

export function checkFinancingEligibility() {
  userFinancingProfile = {
    ...userFinancingProfile,
    creditLimitEligible: true,
    kycStatus: userFinancingProfile.kycStatus === 'not-started' ? 'pending' : userFinancingProfile.kycStatus,
  }

  return {
    eligible: true,
    creditLimit: userFinancingProfile.creditLimit,
    consentRequired: userFinancingProfile.kycStatus !== 'verified',
    message: 'Eligible through sandbox OCEN assessment.',
  }
}

export function startLoanApplication(type: LoanType, amount?: number, tenure?: number) {
  const applicationId = `app-${Date.now()}`
  const requestedAmount = amount ?? defaultAmountForType(type)
  const requestedTenure = tenure ?? (type === 'business-expansion' ? 12 : 6)

  const offers = lenderOffers.map((offer) => {
    const emiAmount = calculateEmi(requestedAmount, offer.interestRate, requestedTenure)

    return {
      ...offer,
      loanAmount: requestedAmount,
      tenure: requestedTenure,
      emiAmount,
      totalRepayment: emiAmount * requestedTenure,
      totalInterest: emiAmount * requestedTenure - requestedAmount,
    }
  })

  applicationOfferMap.set(applicationId, offers)

  return {
    applicationId,
    type,
    status: 'offers-ready',
    offers,
  }
}

export function selectLenderOffer(offerId: string) {
  const offer = lenderOffers.find((candidate) => candidate.id === offerId)
  if (!offer) return null

  return {
    offerId,
    status: 'selected',
    nextStep: 'esign-and-upi-autopay',
    disbursalTime: offer.disbursalTime,
  }
}

export function payLoanEmi(loanId: string) {
  const now = new Date().toISOString()
  let updatedLoan: Loan | null = null

  loans = loans.map((loan) => {
    if (loan.id !== loanId || loan.status === 'closed') return loan

    const nextInstallment = loan.emiSchedule.find((emi) => emi.status !== 'paid')
    const emiAmount = loan.nextEmiAmount ?? loan.emiAmount
    const paidSchedule = loan.emiSchedule.map((emi) =>
      emi.id === nextInstallment?.id
        ? {
            ...emi,
            status: 'paid' as const,
            paidAt: now,
            reference: `UPI/${Date.now()}/${loan.lenderName.split(' ')[0].toUpperCase()}`,
          }
        : emi
    )
    const emisPaid = Math.min(loan.totalEmis, loan.emisPaid + 1)
    const outstandingBalance = Math.max(0, loan.outstandingBalance - emiAmount)
    const isClosed = outstandingBalance === 0 || emisPaid === loan.totalEmis
    const nextUnpaid = paidSchedule.find((emi) => emi.status !== 'paid')

    updatedLoan = {
      ...loan,
      status: isClosed ? 'closed' : 'active',
      repaymentStatus: isClosed ? 'closed' : 'on-track',
      emisPaid,
      outstandingBalance,
      nextEmiDate: nextUnpaid?.dueDate ?? null,
      nextEmiAmount: nextUnpaid?.amount ?? null,
      closedAt: isClosed ? now : null,
      nocAvailable: isClosed,
      milestoneReached: isClosed ? 'closed' : loan.milestoneReached,
      emiSchedule: paidSchedule,
    }

    return updatedLoan
  })

  return updatedLoan
}

export function requestEarlyClosure(loanId: string) {
  const loan = loans.find((candidate) => candidate.id === loanId)
  if (!loan || loan.status === 'closed') return null

  return {
    loanId,
    status: 'closure-quote-ready',
    amountDue: loan.outstandingBalance,
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
}

export function acceptCreditLadderOffer() {
  if (!userFinancingProfile.creditLadder.active) return userFinancingProfile

  userFinancingProfile = {
    ...userFinancingProfile,
    creditLimit: userFinancingProfile.creditLadder.newLimitOffer,
    creditLadder: {
      ...userFinancingProfile.creditLadder,
      active: false,
    },
  }

  return userFinancingProfile
}

export function getLoanDocument(loanId: string, type: 'statement' | 'noc') {
  const loan = loans.find((candidate) => candidate.id === loanId)
  if (!loan) return null
  if (type === 'noc' && !loan.nocAvailable) return null

  return {
    filename: `${loan.id}-${type}.txt`,
    content: [
      `Shakti Financing ${type.toUpperCase()}`,
      `Loan: ${loan.id}`,
      `Lender: ${loan.lenderName}`,
      `Amount: INR ${loan.amount}`,
      `Outstanding: INR ${loan.outstandingBalance}`,
    ].join('\n'),
  }
}

function defaultAmountForType(type: LoanType) {
  if (type === 'course-financing') return 8000
  if (type === 'business-expansion') return 50000
  return 10000
}

function calculateEmi(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) return Math.round(principal / tenureMonths)
  const factor = Math.pow(1 + monthlyRate, tenureMonths)
  return Math.round((principal * monthlyRate * factor) / (factor - 1))
}
