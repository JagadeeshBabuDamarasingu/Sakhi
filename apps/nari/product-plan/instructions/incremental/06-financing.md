# Milestone 6: Financing

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Financing section — an OCEN-powered loan hub that gives women entrepreneurs access to micro-loans, course financing, and business expansion loans.

## Overview

The Financing section adapts to the user's borrower state. First-time users see a credit limit eligibility check CTA with trust-building messaging (RBI registration, no collateral, testimonials). Returning borrowers see their active loan dashboard with EMI progress, repayment schedule, and payment actions. The entire loan journey — from eligibility check through OCEN disbursal — is guided step-by-step within the app.

**Key Functionality:**
- Smart home card: "Check eligibility" for new users; outstanding balance for active borrowers
- 3 loan types: Micro-loan (₹2K–50K), Course EMI (0% interest), Business Loan (₹50K+)
- Active loan cards with EMI progress bars (color-coded: green/amber/red)
- Expandable EMI schedule with installment status dots
- Pay Now / Early repayment / Manage UPI Autopay actions
- Credit ladder upgrade offer after successful repayments
- Trust signals: RBI badge, no collateral, funds in 2–6 hours, no hidden charges
- Testimonials carousel from women entrepreneurs in regional languages
- Download loan statement and NOC for closed loans

## Recommended Approach: Test-Driven Development

See `product-plan/sections/financing/tests.md` for detailed test-writing instructions including:
- First-time borrower CTA flow
- Active loan EMI progress and status display
- Pay EMI callback
- EMI schedule accordion
- Credit ladder offer
- Document download for closed loans
- Empty states

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/financing/components/`:

- `FinancingDashboard` — Complete financing hub (all sub-components are self-contained within the file)

### Data Layer

The `FinancingDashboard` component expects (see `types.ts`):

- `userFinancingProfile` — Credit limit, KYC status, first-time borrower flag, credit ladder offer
- `loans` — Active, closed, and overdue loans with EMI schedules
- `lenderOffers` — Competing offers shown during application (for offer comparison screen)
- `testimonials` — Trust-building testimonials from women entrepreneurs

### API Endpoints to Build

```
GET  /api/financing/profile         → User financing profile + credit limit
GET  /api/financing/loans           → All user loans
GET  /api/financing/eligibility     → Check OCEN eligibility
POST /api/financing/apply           → Start loan application
GET  /api/financing/offers/:appId   → Get lender offers for application
POST /api/financing/offers/:id/select → Select a lender offer
POST /api/financing/loans/:id/pay   → Make EMI payment (UPI)
POST /api/financing/loans/:id/close → Request early closure
GET  /api/financing/loans/:id/statement → Download statement PDF
GET  /api/financing/loans/:id/noc   → Download NOC PDF (if available)
```

### OCEN Integration

OCEN (Open Credit Enablement Network) is India's open protocol for lending. Key integration points:
- Account Aggregator consent for financial data sharing
- Lender discovery and offer comparison
- e-KYC verification
- UPI Autopay mandate for EMI collection
- Loan disbursal confirmation

**Important:** OCEN integration requires partnerships with lenders (NBFCs) and an Account Aggregator. This is a significant compliance and integration effort. Plan for a phased approach:
1. Phase 1: UI flows with mock/sandbox OCEN data
2. Phase 2: Live OCEN integration with real lender partners

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onApplyForLoan(type)` | Start loan application for 'micro-loan', 'course-financing', or 'business-expansion' |
| `onPayEmi(loanId)` | Trigger UPI payment flow for next EMI |
| `onEarlyRepayment(loanId)` | Initiate early loan closure flow |
| `onManageMandate(loanId)` | Open UPI Autopay management screen |
| `onDownloadDocument(loanId, type)` | Download 'statement' or 'noc' |
| `onCheckEligibility()` | Run OCEN eligibility check |
| `onAcceptCreditLadder()` | Accept increased credit limit offer |

### Financial Literacy Considerations

The UI includes tooltips and plain-language explanations ("What is an EMI?", "Why does interest decrease over time?"). When wiring up the loan application flow, ensure:
- All financial terms have accessible explanations
- Loan costs are fully transparent before commitment
- Total interest and effective rate shown before e-signing

### Empty States

- **No active loans + first-time borrower:** Hero shows credit limit with "Check eligibility" CTA
- **No active loans + returning borrower:** Hero shows "₹0 outstanding" with loan type cards
- **No testimonials:** Testimonials section doesn't render

## Files to Reference

- `product-plan/sections/financing/README.md` — Feature overview
- `product-plan/sections/financing/tests.md` — Test-writing instructions
- `product-plan/sections/financing/components/` — React components
- `product-plan/sections/financing/types.ts` — TypeScript interfaces
- `product-plan/sections/financing/sample-data.json` — Test data

## Expected User Flows

### Flow 1: First-Time Borrower Checks Eligibility

1. User opens Financing section for the first time
2. User sees credit card hero with "Your credit limit: ₹50,000" and "Check eligibility →"
3. User taps "Check eligibility"
4. App runs OCEN eligibility check (may require Account Aggregator consent)
5. **Outcome:** Eligibility confirmed; user proceeds to loan type selection

### Flow 2: Apply for a Micro-Loan

1. User clicks the "Micro-loan · ₹2K – ₹50K" card
2. User enters loan amount and tenure using sliders
3. App shows real-time EMI calculation
4. User reviews Account Aggregator consent screen (plain language)
5. User sees 2-3 lender offers and selects the recommended one
6. User e-signs and sets up UPI Autopay
7. **Outcome:** Loan disbursed to UPI id within 2-6 hours; Active Loans section appears

### Flow 3: Pay an EMI

1. Returning user opens Financing section
2. User sees active loan card with "Due soon" amber status
3. User taps "Pay Now"
4. UPI payment flow completes
5. **Outcome:** EMI marked as paid; progress bar updates; status returns to "On track"

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] First-time user sees eligibility CTA in hero card
- [ ] Active borrower sees outstanding balance and next EMI
- [ ] Loan cards render with correct status colors (green/amber/red)
- [ ] EMI schedule accordion expands and shows installment status
- [ ] Pay Now, Early Repayment, and Manage Mandate callbacks work
- [ ] Credit ladder offer renders when active; hidden when not
- [ ] Loan type cards trigger `onApplyForLoan`
- [ ] Closed loans show in Past Loans with NOC/statement download
- [ ] Testimonials render in horizontal scroll carousel
- [ ] Trust signals row visible below loan type cards
- [ ] Responsive on mobile
