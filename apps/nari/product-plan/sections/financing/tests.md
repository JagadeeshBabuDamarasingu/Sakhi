# Test Instructions: Financing

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Financing section is an OCEN-powered loan hub. Key flows to test: first-time user eligibility CTA, active loan display with EMI progress, paying EMI, expanding the repayment schedule, credit ladder offer, and downloading loan documents.

---

## User Flow Tests

### Flow 1: First-Time Borrower

**Scenario:** User has never taken a loan; sees eligibility CTA.

**Setup:**
- `userFinancingProfile.isFirstTimeBorrower: true`
- `loans: []` (no active or past loans)
- `userFinancingProfile.creditLimit: 50000`

**Expected Results:**
- [ ] Hero credit card shows "Your credit limit" with "₹50,000"
- [ ] "Check eligibility →" button is visible
- [ ] Clicking button calls `onCheckEligibility`
- [ ] Active Loans section does NOT render
- [ ] "Get a New Loan" section with 3 loan type cards renders
- [ ] Trust signals row is visible (RBI, No collateral, etc.)
- [ ] Testimonials section renders with testimonial cards

---

### Flow 2: Active Borrower Dashboard

**Scenario:** User has an active micro-loan.

**Setup:**
- `loans` has 1 active micro-loan with:
  - `status: 'active'`
  - `repaymentStatus: 'on-track'`
  - `emisPaid: 3`, `totalEmis: 12`
  - `outstandingBalance: 37500`
  - `nextEmiDate: '2026-06-01'`
  - `nextEmiAmount: 2500`

**Expected Results:**
- [ ] Hero shows "Total outstanding" with "₹37,500"
- [ ] "Active Loans" section renders with 1 LoanCard
- [ ] LoanCard shows loan purpose, outstanding balance, and "₹2,500 · 1 Jun" next EMI
- [ ] Progress bar shows 25% (3/12 EMIs paid)
- [ ] "On track" status badge shows in green/emerald
- [ ] "Pay Now" button is visible

---

### Flow 3: Pay EMI

**Steps:**
1. User sees active LoanCard with "Pay Now" button
2. User clicks "Pay Now"

**Expected Results:**
- [ ] `onPayEmi` is called with the correct loan id

---

### Flow 4: View EMI Schedule

**Steps:**
1. User sees active LoanCard
2. User clicks "Schedule" button on the card
3. EMI schedule expands showing 12 installment rows

**Expected Results:**
- [ ] Schedule accordion opens/closes on click
- [ ] Paid EMIs show green checkmark circle
- [ ] Upcoming EMIs show installment number
- [ ] Due-soon EMIs show amber styling with "Due soon" label
- [ ] Overdue EMIs show red styling with "Overdue" label
- [ ] "Close loan early →" link appears at bottom of schedule
- [ ] Clicking early repayment link calls `onEarlyRepayment` with loan id

---

### Flow 5: Apply for New Loan

**Setup:** 3 loan type cards visible ("Micro-loan", "Course EMI", "Business Loan")

**Steps:**
1. User clicks "Micro-loan" card

**Expected Results:**
- [ ] `onApplyForLoan` is called with `'micro-loan'`
- [ ] Similarly for `'course-financing'` and `'business-expansion'`

---

### Flow 6: Credit Ladder Offer

**Setup:**
- `userFinancingProfile.creditLadder.active: true`
- `userFinancingProfile.creditLadder.message: "You're eligible for ₹75,000 based on your repayment history!"`

**Expected Results:**
- [ ] Credit ladder banner renders with ⬆️ icon
- [ ] Banner shows the credit upgrade message
- [ ] "Claim" button calls `onAcceptCreditLadder`

---

### Flow 7: Download Documents (Closed Loan)

**Setup:**
- `loans` has 1 closed loan with `nocAvailable: true`

**Steps:**
1. User sees the closed LoanCard in "Past Loans" section
2. User clicks "Download NOC"
3. User clicks "Statement"

**Expected Results:**
- [ ] Closed LoanCard shows "Download NOC" button (when `nocAvailable: true`)
- [ ] "Statement" button is visible
- [ ] "Download NOC" calls `onDownloadDocument(loanId, 'noc')`
- [ ] "Statement" calls `onDownloadDocument(loanId, 'statement')`
- [ ] Loan shows "✅ Fully repaid · Great credit history!" milestone chip

---

## Empty State Tests

### No Active Loans (First-Time User)

**Setup:** `loans: []`, `userFinancingProfile.isFirstTimeBorrower: true`

**Expected Results:**
- [ ] Hero shows credit limit with "Check eligibility" CTA
- [ ] "Active Loans" section header does NOT render
- [ ] "Past Loans" section does NOT render
- [ ] "Get a New Loan" section renders normally

### No Testimonials

**Setup:** `testimonials: []`

**Expected Results:**
- [ ] Testimonials section does NOT render
- [ ] No blank space or error

### No Credit Ladder Offer

**Setup:** `userFinancingProfile.creditLadder.active: false`

**Expected Results:**
- [ ] Credit ladder banner does NOT render

---

## Component Interaction Tests

### LoanCard — Repayment Status Styling

- [ ] `repaymentStatus: 'on-track'` shows emerald/green badge and progress bar
- [ ] `repaymentStatus: 'due-soon'` shows amber badge; next EMI box has amber background
- [ ] `repaymentStatus: 'overdue'` shows red badge and red progress bar

### LoanCard — Milestone

- [ ] `milestoneReached: 'halfway'` shows "Halfway there!" celebration chip (only for active loans)
- [ ] `milestoneReached: 'closed'` shows "Fully repaid · Great credit history!" chip (only for closed loans)
- [ ] `milestoneReached: null` shows no milestone chip

### EMI Schedule Installments

- [ ] `status: 'paid'` installments show green circle with ✓ and strikethrough date
- [ ] `status: 'upcoming'` shows installment number in outlined circle
- [ ] `status: 'due-soon'` shows amber circle with "Due soon" label
- [ ] `status: 'overdue'` shows red circle with "Overdue" label

---

## Edge Cases

- [ ] Loan with 0 EMIs paid shows 0% progress bar
- [ ] Loan with all EMIs paid (100%) shows full progress bar
- [ ] Multiple active loans: all render in "Active Loans" section
- [ ] Multiple closed loans: all render in "Past Loans" section
- [ ] Total outstanding = sum of all active loan balances in hero card
- [ ] `lenderName` with long name truncates in loan card header

---

## Accessibility Checks

- [ ] "Pay Now" button has clear text
- [ ] EMI schedule toggle (Schedule/Hide) indicates expanded state
- [ ] Download buttons have descriptive text (not just icons)
- [ ] Loan type cards are keyboard accessible

---

## Sample Test Data

```typescript
const mockActiveLoans = [
  {
    id: 'loan-001',
    type: 'micro-loan' as const,
    purpose: 'Inventory for festival season',
    status: 'active' as const,
    lenderName: 'LendingKart Finance Ltd.',
    lenderNbfcRegistration: 'N-13.02218',
    amount: 50000,
    interestRate: 18,
    effectiveAnnualRate: 19.56,
    tenure: 12,
    emiAmount: 4584,
    totalRepayment: 55008,
    totalInterest: 5008,
    processingFee: 500,
    disbursedAt: '2026-01-15T10:00:00Z',
    nextEmiDate: '2026-06-15',
    nextEmiAmount: 4584,
    outstandingBalance: 41256,
    emisPaid: 5,
    totalEmis: 12,
    repaymentStatus: 'on-track' as const,
    upiMandateActive: true,
    upiMandateDebitDay: 15,
    milestoneReached: null,
    nocAvailable: false,
    closedAt: null,
    emiSchedule: Array.from({ length: 12 }, (_, i) => ({
      id: `emi-${i + 1}`,
      installmentNumber: i + 1,
      dueDate: new Date(2026, i + 1, 15).toISOString(),
      amount: 4584,
      status: i < 5 ? 'paid' as const : i === 5 ? 'due-soon' as const : 'upcoming' as const,
      paidAt: i < 5 ? new Date(2026, i + 1, 14).toISOString() : null,
      reference: i < 5 ? `UPI${i + 1}` : null,
    })),
  },
]

const mockFirstTimeProfile = {
  isFirstTimeBorrower: true,
  creditLimit: 50000,
  creditLimitEligible: true,
  creditLadder: { active: false, previousLoanAmount: 0, newLimitOffer: 0, message: '' },
  upiId: 'priya@upi',
  kycStatus: 'verified' as const,
}

// Empty states
const emptyLoans = []
const emptyTestimonials = []
```
