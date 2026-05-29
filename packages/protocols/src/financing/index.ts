// Financing domain — shared data models
// Source of truth: proto/financing/v1/financing.proto
// This file is the hand-authored TypeScript equivalent until `buf generate` is wired.

export type LoanType = 'micro-loan' | 'course-financing' | 'business-expansion'

export type LoanStatus = 'active' | 'closed' | 'overdue' | 'pending'

export type RepaymentStatus = 'on-track' | 'due-soon' | 'overdue' | 'closed'

export type EmiStatus = 'paid' | 'upcoming' | 'due-soon' | 'overdue'

export type MilestoneType = 'halfway' | 'closed' | null

export type KycStatus = 'verified' | 'pending' | 'not-started'

export type ApplicationStatus =
  | 'offers-ready'
  | 'offer-selected'
  | 'esign-pending'
  | 'disbursed'
  | 'rejected'

export interface EmiInstallment {
  id: string
  installmentNumber: number
  dueDate: string
  amount: number
  status: EmiStatus
  paidAt: string | null
  reference: string | null
}

export interface Loan {
  id: string
  type: LoanType
  purpose: string
  status: LoanStatus
  lenderName: string
  lenderNbfcRegistration: string
  amount: number
  interestRate: number
  effectiveAnnualRate: number
  tenure: number
  emiAmount: number
  totalRepayment: number
  totalInterest: number
  processingFee: number
  disbursedAt: string
  nextEmiDate: string | null
  nextEmiAmount: number | null
  outstandingBalance: number
  emisPaid: number
  totalEmis: number
  repaymentStatus: RepaymentStatus
  upiMandateActive: boolean
  upiMandateDebitDay: number
  milestoneReached: MilestoneType
  nocAvailable: boolean
  closedAt: string | null
  emiSchedule: EmiInstallment[]
}

export interface LenderOffer {
  id: string
  lenderName: string
  lenderLogo: string
  rbiRegistration: string
  isRecommended: boolean
  loanAmount: number
  interestRate: number
  effectiveAnnualRate: number
  tenure: number
  emiAmount: number
  processingFee: number
  totalRepayment: number
  totalInterest: number
  disbursalTime: string
  noCollateral: boolean
  noGuarantor: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  business: string
  quote: string
  quoteTranslation: string | null
  loanType: LoanType
  loanAmount: number
  avatarInitials: string
}

export interface CreditLadder {
  active: boolean
  previousLoanAmount: number
  newLimitOffer: number
  message: string
}

export interface UserFinancingProfile {
  isFirstTimeBorrower: boolean
  creditLimit: number
  creditLimitEligible: boolean
  creditLadder: CreditLadder
  upiId: string
  kycStatus: KycStatus
}

export interface UpiMandate {
  loanId: string
  active: boolean
  debitDay: number
  upiId: string
  mandateRef: string | null
}

export interface EligibilityResult {
  eligible: boolean
  creditLimit: number
  consentRequired: boolean
  message: string
}

export interface LoanApplication {
  applicationId: string
  type: LoanType
  status: ApplicationStatus
  offers: LenderOffer[]
}

export interface OfferSelection {
  offerId: string
  status: 'selected'
  nextStep: 'esign-and-upi-autopay'
  disbursalTime: string
}

export interface ClosureQuote {
  loanId: string
  status: 'closure-quote-ready'
  amountDue: number
  validUntil: string
}
