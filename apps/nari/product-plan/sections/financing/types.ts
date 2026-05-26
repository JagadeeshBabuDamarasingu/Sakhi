// =============================================================================
// Data Types
// =============================================================================

export type LoanType = 'micro-loan' | 'course-financing' | 'business-expansion'

export type LoanStatus = 'active' | 'closed' | 'overdue' | 'pending'

export type RepaymentStatus = 'on-track' | 'due-soon' | 'overdue' | 'closed'

export type EmiStatus = 'paid' | 'upcoming' | 'due-soon' | 'overdue'

export type MilestoneType = 'halfway' | 'closed' | null

export type KycStatus = 'verified' | 'pending' | 'not-started'

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

// =============================================================================
// Component Props
// =============================================================================

export interface FinancingProps {
  /** The user's financing profile — credit limit, borrower status, and credit ladder offer */
  userFinancingProfile: UserFinancingProfile
  /** All loans belonging to the user — active, closed, and overdue */
  loans: Loan[]
  /** Competing lender offers shown during the offer comparison step */
  lenderOffers: LenderOffer[]
  /** Trust-building testimonials from women entrepreneurs in regional context */
  testimonials: Testimonial[]
  /** Called when user initiates a new loan application for a given type */
  onApplyForLoan?: (type: LoanType) => void
  /** Called when user selects a lender offer from the comparison screen */
  onSelectOffer?: (offerId: string) => void
  /** Called when user taps "Pay Now" to make a manual EMI payment */
  onPayEmi?: (loanId: string) => void
  /** Called when user requests early loan closure */
  onEarlyRepayment?: (loanId: string) => void
  /** Called when user wants to view, modify, or cancel UPI Autopay mandate */
  onManageMandate?: (loanId: string) => void
  /** Called when user downloads a loan statement or NOC document */
  onDownloadDocument?: (loanId: string, documentType: 'statement' | 'noc') => void
  /** Called when first-time user taps "Check my credit limit" eligibility CTA */
  onCheckEligibility?: () => void
  /** Called when user accepts the credit ladder upgrade offer */
  onAcceptCreditLadder?: () => void
}
