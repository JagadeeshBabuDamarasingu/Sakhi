# Test Instructions: Dashboard

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Dashboard is the user's command center. Key functionality to test: onboarding checklist for first-time users, live metrics display, announcement rendering, quick action navigation, and the AI agent summary card.

---

## User Flow Tests

### Flow 1: First-Time User Onboarding

**Scenario:** A new user sees the onboarding checklist and completes steps.

#### Success Path

**Setup:**
- User has `isFirstTime: true` and `onboardingCompleted: false`
- `onboardingSteps` array has 3 steps, none completed

**Steps:**
1. User lands on Dashboard
2. User sees the onboarding checklist card with 3 steps
3. User clicks "Complete" or the CTA on the "Discover your skills" step
4. Step is marked complete

**Expected Results:**
- [ ] Onboarding checklist card is visible on page load
- [ ] All 3 steps are shown with their titles and descriptions
- [ ] `onCompleteOnboardingStep` is called with the correct step id
- [ ] Completed step shows visual confirmation (checkmark or strikethrough)
- [ ] After all 3 steps completed, checklist card disappears from the UI

#### When All Steps Done

**Setup:**
- All `onboardingSteps` have `completed: true`

**Expected Results:**
- [ ] Onboarding checklist does NOT render
- [ ] Dashboard shows the returning user view instead

---

### Flow 2: Returning User Dashboard

**Scenario:** A returning user sees their live metrics.

**Setup:**
- `metrics.earningsThisMonth: 15000`
- `metrics.pendingOrdersCount: 3`
- `metrics.activeCoursesCount: 2`
- `metrics.loanStatus: 'active'`
- `metrics.activeLoanBalance: 25000`

**Expected Results:**
- [ ] MetricsRow renders with 4 cards
- [ ] Earnings card shows "₹15,000" (formatted in Indian style)
- [ ] Orders card shows "3" pending orders
- [ ] Courses card shows "2" active courses
- [ ] Loan card shows active loan balance

---

### Flow 3: Quick Actions Navigation

**Scenario:** User taps a quick action to navigate.

**Steps:**
1. User sees the QuickActionsBar with 4 action buttons
2. User clicks "Resume course" button
3. User clicks "Add product" button
4. User clicks "Check loan" button
5. User clicks "Start skill assessment" button

**Expected Results:**
- [ ] "Resume course" calls `onNavigateTo('elearning')`
- [ ] "Add product" calls `onNavigateTo('marketplace')`
- [ ] "Check loan" calls `onNavigateTo('financing')`
- [ ] "Start skill assessment" calls `onNavigateTo('skill-discovery')`

---

### Flow 4: Announcement Interactions

**Scenario:** User reads and dismisses an announcement.

**Setup:**
- `announcements` array has 2 unread announcements (1 platform, 1 personalized)

**Steps:**
1. User sees AnnouncementsBar with 2 banners
2. User clicks dismiss (✕) on the first announcement
3. User clicks "Mark as read" on the second announcement

**Expected Results:**
- [ ] AnnouncementsBar renders with 2 announcement cards
- [ ] Dismiss calls `onDismissAnnouncement` with correct id
- [ ] Mark as read calls `onMarkAnnouncementRead` with correct id
- [ ] When all announcements are read, AnnouncementsBar doesn't render

---

## Empty State Tests

### No Announcements

**Setup:** `announcements` is empty `[]` or all are `isRead: true`

**Expected Results:**
- [ ] AnnouncementsBar does NOT render
- [ ] Rest of Dashboard renders normally

### No Milestones Earned

**Setup:** All `milestones` have `earnedAt: null`

**Expected Results:**
- [ ] MilestonesCard renders with locked/greyed milestone icons
- [ ] No error or blank space

### No AI Agent Actions

**Setup:** `agentActions` is empty `[]`, `recommendations` is empty `[]`

**Expected Results:**
- [ ] AgentSummaryCard renders with an empty state message
- [ ] No JavaScript errors or blank cards

---

## Component Interaction Tests

### MetricsRow — Loan Status Chip

- [ ] `loanStatus: 'active'` shows loan balance and next repayment info
- [ ] `loanStatus: 'eligible'` shows "Apply now" CTA chip
- [ ] `loanStatus: 'not-eligible'` shows neutral state
- [ ] `loanStatus: 'pending'` shows pending state

### StreakCard

- [ ] Shows `currentDays` number prominently
- [ ] Shows 7-day activity dots from `weekActivity` array (true = active, false = inactive)
- [ ] Shows `longestDays` as best streak record

### NextGoalCard

- [ ] Renders goal title and description from `nextGoal`
- [ ] Progress bar reflects `progressPercent`
- [ ] CTA button calls `onNavigateTo` with `nextGoal.targetSection`

---

## Edge Cases

- [ ] User name with very long text truncates gracefully in hero section
- [ ] `earningsThisMonth: 0` shows "₹0" not blank
- [ ] `weekActivity` with all false values shows all inactive dots
- [ ] Dashboard renders without crashing when all optional callbacks are undefined

---

## Accessibility Checks

- [ ] Quick action buttons have descriptive aria-labels
- [ ] Announcement dismiss buttons are keyboard accessible
- [ ] Onboarding step CTAs have clear focus states

---

## Sample Test Data

```typescript
const mockUser = {
  id: 'user-001',
  name: 'Priya Sharma',
  avatarUrl: null,
  preferredLanguage: 'hi',
  city: 'Jaipur',
  isFirstTime: false,
  onboardingCompleted: true,
  memberSince: '2025-11-10',
}

const mockMetrics = {
  earningsThisMonth: 15000,
  earningsLastMonth: 12000,
  pendingOrdersCount: 3,
  activeCoursesCount: 2,
  loanStatus: 'active' as const,
  activeLoanBalance: 25000,
  totalLoanAmount: 50000,
  nextRepaymentDate: '2026-06-01',
  nextRepaymentAmount: 2500,
}

const mockAnnouncements = [
  {
    id: 'ann-001',
    title: 'Loan repayment due',
    message: 'Your next EMI of ₹2,500 is due on June 1st.',
    type: 'personalized' as const,
    severity: 'warning' as const,
    expiresAt: '2026-06-01',
    isRead: false,
  },
]

// Empty states
const emptyOnboardingSteps = []
const emptyAnnouncements = []
const emptyAgentActions = []
```
