# Financing

## Overview

The Financing section is an OCEN-powered hub that gives women entrepreneurs access to micro-loans, course financing (BNPL), and business expansion loans — all without collateral or a bank visit. The home screen adapts to context: first-time users see an eligibility entry point with trust-building messaging, while returning borrowers see their active loan dashboard.

## User Flows

- **Smart home screen** — Shows "Get a loan" CTA for new users or active loan status card for existing borrowers
- **Check eligibility** — First-time user taps CTA to check credit limit
- **Apply for loan** — Select loan type (micro-loan, course EMI, business expansion)
- **View active loans** — See EMI progress bar, schedule, and make payments
- **Pay EMI** — Tap "Pay Now" to make a manual payment via UPI
- **View EMI schedule** — Expand loan card to see installment-by-installment breakdown
- **Early repayment** — One-tap early loan closure from the schedule view
- **Manage UPI Autopay** — View, modify, or cancel UPI mandate
- **Credit ladder** — Accept increased credit limit offer after first repayment
- **Download documents** — Get statement PDF or NOC after loan closure

## Design Decisions

- Hero credit card uses a rose gradient with decorative circles — adapts between "Check eligibility" (new user) and "Total outstanding" (active borrower)
- LoanCard accordion: expanded state shows EMI schedule with color-coded status dots
- Color-coded repayment status: emerald (on-track), amber (due-soon), red (overdue)
- Milestone celebrations (halfway, fully repaid) shown as inline chip inside LoanCard
- Trust signals row (RBI, No collateral, Funds in hours, No hidden charges) appears below loan type cards
- Testimonials scroll horizontally in a card carousel

## Data Used

**Entities:** UserFinancingProfile, Loan, LenderOffer, Testimonial

**From global model:** User (for KYC status and UPI id)

## Components Provided

- `FinancingDashboard` — Complete financing hub with hero card, loan cards, new loan section, and testimonials
- `LoanCard` (internal) — Individual loan card with progress, EMI schedule accordion, and payment actions
- `TestimonialCard` (internal) — Horizontally scrolling trust testimonials

## Callback Props

| Callback | Description |
|----------|-------------|
| `onApplyForLoan(type)` | Start loan application for given type |
| `onPayEmi(loanId)` | Make EMI payment for a loan |
| `onEarlyRepayment(loanId)` | Close loan early |
| `onManageMandate(loanId)` | Manage UPI Autopay mandate |
| `onDownloadDocument(loanId, type)` | Download 'statement' or 'noc' |
| `onCheckEligibility()` | First-time user eligibility check |
| `onAcceptCreditLadder()` | Accept credit limit upgrade |
