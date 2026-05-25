# Milestone 2: Dashboard

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

Implement the Dashboard — the user's command center showing their journey status at a glance.

## Overview

The Dashboard is the default landing view after login. It adapts based on user state: first-time users see an onboarding checklist guiding them through key setup steps; returning users see live metrics (earnings, pending orders, active courses, loan status), motivational content (streaks, milestones), AI agent activity summaries, and announcements.

**Key Functionality:**
- Onboarding checklist for first-time users (disappears after all steps complete)
- Live metrics: monthly earnings, pending order count, active courses, loan status
- Streak tracker and earned milestone badges
- Next goal nudge card with progress indicator
- AI agent summary: recent agentic actions + smart recommendations
- Quick action shortcuts to all 5 sections
- Announcements: platform-wide alerts and personalized notifications

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/dashboard/tests.md` for detailed test-writing instructions including:
- First-time user onboarding checklist flows
- Returning user metrics display
- Quick action navigation callbacks
- Announcement interaction (dismiss, mark as read)
- Empty states for announcements, milestones, and AI agent actions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the dashboard components from `product-plan/sections/dashboard/components/`:

- `Dashboard` — Main layout orchestrator
- `MetricsRow` — Live KPI cards
- `OnboardingChecklist` — First-time user setup guide
- `AnnouncementsBar` — Stacked alert banners
- `StreakCard` — Learning streak tracker
- `MilestonesCard` — Achievement badges
- `NextGoalCard` — Contextual nudge card
- `AgentSummaryCard` — AI actions feed + recommendations
- `QuickActionsBar` — 4 shortcut buttons

### Data Layer

The `Dashboard` component expects these data shapes (see `types.ts`):

- `user` — Name, city, member since, language preference
- `metrics` — Earnings, order count, active courses, loan status/balance
- `onboardingSteps` — Array of steps with `completed` boolean
- `streak` — Current and longest day counts, weekly activity array
- `milestones` — Earned/unearned milestone badges
- `nextGoal` — Title, description, progress percent, target section
- `agentActions` — Recent AI actions feed
- `recommendations` — Forward-looking smart suggestions
- `announcements` — Platform and personalized alerts with read/dismissed state

### API Endpoints to Build

```
GET /api/dashboard          → Returns the complete dashboard data
PATCH /api/onboarding/:id   → Mark onboarding step as complete
PATCH /api/announcements/:id/read     → Mark announcement as read
DELETE /api/announcements/:id         → Dismiss announcement
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onNavigateTo(section)` | Route to `/${section}` |
| `onCompleteOnboardingStep(stepId)` | PATCH /api/onboarding/:stepId |
| `onDismissAnnouncement(id)` | DELETE /api/announcements/:id |
| `onMarkAnnouncementRead(id)` | PATCH /api/announcements/:id/read |

### Empty States

- **First-time user:** `onboardingSteps` where none are complete → checklist renders with all steps unchecked
- **All steps done:** `onboardingSteps` all `completed: true` → checklist does not render
- **No announcements:** `announcements` all `isRead: true` → AnnouncementsBar does not render
- **No AI actions:** `agentActions: []` → AgentSummaryCard renders with empty state message

## Files to Reference

- `product-plan/sections/dashboard/README.md` — Feature overview and design intent
- `product-plan/sections/dashboard/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/dashboard/components/` — React components
- `product-plan/sections/dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard/sample-data.json` — Test data

## Expected User Flows

### Flow 1: First-Time User Onboarding

1. User logs in for the first time
2. User sees the Dashboard with an onboarding checklist card at the top
3. User reads "Discover your skills" step and clicks the CTA to navigate to Skill Discovery
4. User completes skill discovery and returns to Dashboard
5. **Outcome:** Step is checked off; after all 3 steps done, checklist card disappears

### Flow 2: Returning User Views Metrics

1. Returning user logs in
2. User sees live metrics: earnings, pending orders, active courses, loan status
3. User taps "Resume course" quick action
4. **Outcome:** User navigates to eLearning section

### Flow 3: Dismiss Announcement

1. User sees an amber loan repayment reminder announcement
2. User taps the ✕ dismiss button
3. **Outcome:** Announcement disappears; if it was the last unread, the bar disappears entirely

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Dashboard renders with real data from API
- [ ] First-time user sees onboarding checklist
- [ ] Returning user sees metrics, streak, milestones, AI agent card
- [ ] Quick actions navigate to correct sections
- [ ] Announcements can be dismissed and marked as read
- [ ] Empty states render correctly (no announcements, all onboarding done, etc.)
- [ ] Responsive on mobile
