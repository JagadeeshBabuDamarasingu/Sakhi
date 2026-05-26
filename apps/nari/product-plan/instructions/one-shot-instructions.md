# Shakti — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

# Shakti — Product Overview

## Summary

Shakti is a secure, AI-powered economic empowerment platform for women across India, available on web and mobile. It guides women through a complete journey — from discovering their hidden skills through AI and surveys, to learning via courses and live bootcamps with achievers, to earning income through an integrated marketplace and short-video commerce — all connected to India's digital infrastructure (ONDC, OCEN, UPI) with potential state and central government backing.

## Problems & Solutions

**Problem 1: Women don't recognize their marketable skills**
AI-powered skill discovery using conversation, voice (in local languages), visual assessments, and dynamic surveys helps women identify what they can offer and understand their true economic potential.

**Problem 2: No access to markets or customers**
ONDC-connected marketplace plus TikTok-style short video commerce lets women showcase, explain, and sell products and services to a nationwide audience without needing technical expertise.

**Problem 3: Lack of skills and inspiration**
eLearning platform offers courses in digital literacy, business skills, communication, and entrepreneurship, plus live bootcamps and sessions from guest speakers and achievers who serve as role models.

**Problem 4: No access to capital**
OCEN integration provides micro-loans for inventory, course financing for learning, and business expansion loans — all based on the user's stage in their economic journey.

**Problem 5: Complex technology barriers**
Intuitive UI/UX powered by Generative UI adapts dynamically to each user's needs, literacy level, and language preference, making the platform accessible to all segments.

## Key Features

- AI skill discovery (hybrid: conversational, voice-first, visual assessments)
- Multi-language support (rural-first, local language focus)
- Web + Mobile apps with intuitive, adaptive UI/UX
- Generative UI for dynamic interfaces and surveys
- ONDC-connected marketplace for products and services
- Short-video commerce (TikTok-style product showcases and reviews)
- eLearning platform with structured courses
- Live sessions and bootcamps with guest speakers and achievers
- OCEN-powered financing options
- UPI payment integration
- Enterprise-grade security
- Government integration ready (state and central)

## Planned Sections

1. **Dashboard** — The default landing view after login, providing an overview of the user's journey including skill summary, learning progress, marketplace activity, and financing status.
2. **Skill Discovery** — AI-powered journey to help women identify and understand their marketable skills through conversation, voice (in local languages), visual assessments, and dynamic surveys.
3. **eLearning** — Courses, live bootcamps, and sessions with guest speakers and achievers to build digital literacy, business, communication, and entrepreneurial skills.
4. **Marketplace** — ONDC-connected platform with TikTok-style video commerce where women can list, showcase, and sell physical products, local services, or digital services to a nationwide audience.
5. **Financing** — OCEN-powered financing hub providing micro-loans for inventory, course financing for learning, and business expansion loans with seamless UPI payment integration.

## Data Model

Core entities: **User**, **Skill**, **Assessment**, **Course**, **LiveSession**, **Speaker**, **Listing**, **Video**, **Order**, **Loan**

See `data-model/README.md` for full entity relationships.

## Design System

**Colors:**
- Primary: rose
- Secondary: amber
- Neutral: stone

**Typography:**
- Heading: Poppins
- Body: Poppins
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, and application shell
2. **Dashboard** — User command center with metrics, onboarding checklist, and AI agent summaries
3. **Skill Discovery** — Skill cards, validation wizard, AI conversation, and category browser
4. **eLearning** — Personalized learning feed, course cards, live event banners, and badge display
5. **Marketplace** — Seller analytics dashboard with revenue charts, AI insights, and order management
6. **Financing** — OCEN loan hub with EMI tracking, credit ladder, and trust signals

Each milestone has a dedicated instruction document in `product-plan/instructions/`.


---

# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind color usage patterns
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:** Primary = `rose`, Secondary = `amber`, Neutral = `stone`
**Typography:** Poppins for all text, IBM Plex Mono for code

**Important for multi-language support:** Poppins covers Latin characters well. For Devanagari (Hindi), Tamil, Telugu, Kannada, Marathi, Bengali, and Gujarati scripts, add Google's Noto Sans family as a fallback:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&family=Noto+Sans+Tamil&family=Noto+Sans+Telugu&display=swap" rel="stylesheet">
```

### 2. Data Model Types

Create TypeScript interfaces for the core entities:

- See `product-plan/data-model/types.ts` for shared interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- Each section has extended types in `product-plan/sections/[section-id]/types.ts`

Key entities to define first: `User`, `Skill`, `Course`, `Listing`, `Order`, `Loan`

### 3. Routing Structure

Create placeholder routes for each section:

```
/dashboard         → Dashboard (default redirect after login)
/skill-discovery   → Skill Discovery
/elearning         → eLearning
/marketplace       → Seller Dashboard
/financing         → Financing Hub
```

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with responsive header and mobile bottom tabs
- `MainNav.tsx` — Navigation supporting `horizontal` (desktop) and `bottom-tabs` (mobile) variants
- `UserMenu.tsx` — User avatar dropdown with language switcher and logout
- `types.ts` — TypeScript interfaces for shell props

**Wire Up Navigation:**

Connect navigation to your routing system:

| Label | Route | Icon |
|-------|-------|------|
| Dashboard | `/dashboard` | LayoutDashboard |
| Skill Discovery | `/skill-discovery` | Sparkles |
| eLearning | `/elearning` | GraduationCap |
| Marketplace | `/marketplace` | Store |
| Financing | `/financing` | Wallet |

**User Menu expects:**
- `user.name` — User's display name
- `user.avatarUrl` — Optional profile photo URL (falls back to initials)
- `onLogout` — Logout callback
- `onLanguageChange(code)` — Called with language code (`'en'`, `'hi'`, `'ta'`, `'te'`, `'kn'`, `'mr'`, `'bn'`, `'gu'`)
- `currentLanguage` — Currently selected language code

**Dependencies:** Shell components use `react-icons` for icons. Install it:
```bash
npm install react-icons
```

## Files to Reference

- `product-plan/design-system/` — Design tokens and font config
- `product-plan/data-model/` — Type definitions and entity relationships
- `product-plan/shell/README.md` — Shell design intent and wire-up example
- `product-plan/shell/components/` — React components (copy these)

## Done When

- [ ] Design tokens configured (Tailwind colors + Google Fonts)
- [ ] Data model types defined
- [ ] Routes exist for all 5 sections (can be placeholder pages)
- [ ] AppShell renders with top nav on desktop and bottom tabs on mobile
- [ ] Active route is highlighted in navigation
- [ ] User menu shows user name and avatar (or initials)
- [ ] Language switcher shows 8 Indian language options
- [ ] Logout works
- [ ] Responsive on mobile (bottom tab bar visible, header simplified)


---

# Milestone 2: Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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


---

# Milestone 3: Skill Discovery

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) recommended

---

## Goal

Implement the Skill Discovery section — where users view, add, and validate their marketable skills.

## Overview

Skill Discovery helps women identify and understand their marketable skills through multiple methods: AI conversation, skill search, and category browsing. Users see rich skill cards showing proficiency level, market demand, earning potential, and validation status. They can validate skills through a multi-step wizard (AI assessment, document upload, or video demonstration), and receive AI-powered and trending skill suggestions.

**Key Functionality:**
- View all claimed skills as rich cards with market demand and earning potential
- Add skills via search, AI conversation, or category browser
- Validate skills through AI assessment, document upload, or video demonstration
- See AI-recommended and trending skill suggestions
- Empty state guides first-time users to add skills or learn new ones

## Recommended Approach: Test-Driven Development

See `product-plan/sections/skill-discovery/tests.md` for detailed test-writing instructions including:
- Empty state flows (no skills yet)
- Adding skills via search, AI chat, and category browse
- Validating a skill
- Managing suggestions (add/dismiss)

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/skill-discovery/components/`:

- `SkillDiscovery` — Main orchestrator (handles both empty and populated states)
- `SkillCard` — Rich skill card with all metadata
- `SkillSuggestionCard` — Suggested skill with Add/Dismiss actions
- `CategoryBrowser` — Category grid for browsing skills

### Data Layer

The `SkillDiscovery` component expects (see `types.ts`):

- `skills` — User's claimed skills with validation status, proficiency, earning potential, market demand
- `skillCategories` — Available categories for browsing
- `skillSuggestions` — AI-recommended and trending suggestions
- `relatedCourses` — Courses linked from skill cards
- `validationMethods` — Available validation options for each skill type

### API Endpoints to Build

```
GET  /api/skills                    → List user's skills
GET  /api/skills/categories         → Get all skill categories
GET  /api/skills/suggestions        → Get AI + trending suggestions
POST /api/skills                    → Add a new skill
PUT  /api/skills/:id                → Update skill details
DELETE /api/skills/:id              → Remove a skill
POST /api/skills/:id/validate       → Start validation wizard
GET  /api/courses?relatedSkill=:id  → Get related courses for a skill
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onViewSkill(skillId)` | Navigate to skill detail page |
| `onDeleteSkill(skillId)` | DELETE /api/skills/:id |
| `onValidateSkill(skillId)` | Open validation wizard (POST /api/skills/:id/validate) |
| `onEditSkill(skillId)` | Open skill edit form |
| `onSearchSkill(query)` | Search skill catalog and show results |
| `onStartAIConversation()` | Open AI chat interface for skill identification |
| `onBrowseCategory(categoryId)` | Show skills in category for selection |
| `onAddSkill(skillName, categoryId)` | POST /api/skills |
| `onAddSuggestion(suggestionId)` | Accept a suggestion and add skill |
| `onDismissSuggestion(suggestionId)` | Dismiss a suggestion |
| `onViewCourse(courseId)` | Navigate to /elearning with course highlighted |
| `onNavigateToLearning()` | Navigate to /elearning |

### The AI Conversation Flow

When `onStartAIConversation` is called, your implementation should:
1. Open an AI chat interface (modal, side panel, or new page)
2. The AI converses with the user in their preferred language
3. Based on the conversation, suggest skills to add
4. User confirms which skills to add → POST /api/skills

This is a generative AI feature — you'll need to integrate with an LLM API (Claude, GPT, etc.) and build the conversational UI.

### Skill Validation Wizard

When `onValidateSkill` is called:
1. Show available validation methods based on skill type
2. For **AI assessment**: present a questionnaire or interactive tasks
3. For **document upload**: collect certificates, diplomas, or portfolio
4. For **video demonstration**: collect or link a video showing the skill

### Empty States

- **No skills (first-time):** Show hero with "Chat with AI" and "Learn New Skills" CTAs + "Browse categories" link
- **No suggestions:** Show empty state in suggestions panel (not blank)

## Files to Reference

- `product-plan/sections/skill-discovery/README.md` — Feature overview
- `product-plan/sections/skill-discovery/tests.md` — Test-writing instructions
- `product-plan/sections/skill-discovery/components/` — React components
- `product-plan/sections/skill-discovery/types.ts` — TypeScript interfaces
- `product-plan/sections/skill-discovery/sample-data.json` — Test data

## Expected User Flows

### Flow 1: First-Time User Adds a Skill

1. User navigates to Skill Discovery — sees empty state
2. User clicks "Chat with AI" button
3. AI asks about her work, hobbies, and daily activities
4. AI identifies "Mehndi Art" and "Block Printing" as potential skills
5. User confirms both
6. **Outcome:** Both skills appear as SkillCards on her profile

### Flow 2: Add Skill via Category Browse

1. User clicks "Browse skill categories"
2. CategoryBrowser modal opens with category grid
3. User selects "Art & Craft" category
4. User selects "Mehndi Art" from the list
5. **Outcome:** Skill added with auto-verified or unverified status

### Flow 3: Validate a Skill

1. User sees an "Unverified" SkillCard for "Mehndi Art"
2. User clicks "Validate" button
3. Validation wizard opens showing available methods: AI assessment, document upload
4. User selects "Document upload" and uploads a photo of past work
5. **Outcome:** Skill status changes to "Pending" while under review; later "Verified"

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Skills list renders with real data from API
- [ ] Empty state shows for users with no skills
- [ ] Skill search works and adds skills
- [ ] AI conversation flow is implemented (even as a placeholder if LLM integration is pending)
- [ ] Category browser opens and allows skill selection
- [ ] Skill validation wizard works for at least one method
- [ ] Suggestions panel shows AI and trending tabs
- [ ] Suggestions can be added or dismissed
- [ ] Responsive on mobile


---

# Milestone 4: eLearning

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## Goal

Implement the eLearning section — a free, personalized learning platform with courses, live events, badges, and certificates.

## Overview

eLearning offers women free courses across 6 categories: digital literacy, business, communication, personal finance, cyber security, and entrepreneurship. The personalized feed adapts to each user's goals and progress. Live sessions and bootcamps with achievers are prominently featured. Users earn badges and certificates they can share on social media.

**Key Functionality:**
- Personalized feed with in-progress courses and recommendations
- Trending courses row and category filters
- Live event banner for upcoming sessions and bootcamps
- Learning stats (completed count, streak, total time, badges)
- Badges and certificates with social sharing
- Upcoming calendar events sidebar
- Course search and category filtering

## Recommended Approach: Test-Driven Development

See `product-plan/sections/elearning/tests.md` for detailed test-writing instructions including:
- Personalized feed rendering
- Course enrollment and continue flows
- Live session registration
- Badge sharing
- Empty states (no in-progress courses, no live sessions, no badges)

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/elearning/components/`:

- `LearningFeed` — Main layout with all content areas
- `CourseCard` — Course card with progress bar and enroll/continue CTA
- `LiveEventBanner` — Featured upcoming live session with speaker info
- `CategoryPills` — Scrollable category filter pills
- `BadgeDisplay` — Earned badges grid with share buttons
- `StatCard` — Individual learning stat card

### Data Layer

The `LearningFeed` component expects (see `types.ts`):

- `courses` — Full course catalog with metadata
- `speakers` — Speaker profiles for live sessions
- `liveSessions` — Upcoming and past sessions
- `userProgress` — Per-course enrollment and completion status
- `learningGoals` — User's active learning goals
- `badges` — Earned achievement badges
- `certificates` — Earned completion certificates
- `calendarEvents` — Course reminders, session registrations, deadlines
- `categories` — Available course categories
- `userStats` — Aggregated learning statistics

### API Endpoints to Build

```
GET  /api/courses                    → List courses (filterable by category, search)
GET  /api/courses/:id                → Course details
POST /api/courses/:id/enroll         → Enroll in a course
POST /api/courses/:id/progress       → Update progress (module completed)
GET  /api/live-sessions              → List upcoming sessions
POST /api/live-sessions/:id/register → Register for a session
GET  /api/user/learning-stats        → Aggregated user stats
GET  /api/user/badges                → User's earned badges
GET  /api/user/certificates          → User's earned certificates
GET  /api/user/calendar              → Calendar events
POST /api/user/goals                 → Create learning goal
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onViewCourse(courseId)` | Navigate to course detail page |
| `onEnrollCourse(courseId)` | POST /api/courses/:id/enroll |
| `onContinueCourse(courseId)` | Navigate to course player |
| `onViewSession(sessionId)` | Navigate to session detail page |
| `onRegisterSession(sessionId)` | POST /api/live-sessions/:id/register |
| `onShareBadge(badgeId)` | Open share dialog with badge share URL |
| `onFilterByCategory(category)` | Filter course list by category |
| `onSearch(query)` | Search courses by title/description |
| `onOpenCalendar()` | Open calendar view |

### Mandatory Courses

Some courses have `isMandatory: true`. These are security and safety courses that must be completed annually. Implement:
- Visual indicator on mandatory CourseCard (badge or border)
- Reminder logic for annual re-completion
- Completion tracking separate from optional courses

### Empty States

- **No in-progress courses:** "Continue Learning" section doesn't render; prompt to start a course
- **No upcoming live sessions:** LiveEventBanner doesn't render
- **No badges:** BadgeDisplay shows "Complete courses to earn badges" message
- **No upcoming calendar events:** Show "No upcoming events" in sidebar

## Files to Reference

- `product-plan/sections/elearning/README.md` — Feature overview
- `product-plan/sections/elearning/tests.md` — Test-writing instructions
- `product-plan/sections/elearning/components/` — React components
- `product-plan/sections/elearning/types.ts` — TypeScript interfaces
- `product-plan/sections/elearning/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Enroll in a Course

1. User sees "Digital Marketing for Women" CourseCard in "Trending Now"
2. User clicks "View" to see course details
3. User reads the description and clicks "Enroll"
4. **Outcome:** Course moves to "Continue Learning" section with 0% progress bar

### Flow 2: Complete a Course Module

1. User clicks "Continue" on an in-progress course
2. User completes module 3 of 8
3. **Outcome:** Progress bar updates to 37.5%; if last module, certificate is awarded and badge earned

### Flow 3: Register for Live Session

1. User sees LiveEventBanner: "Live Bootcamp with Ritu Agarwal — June 5, 3 PM"
2. User clicks "Register"
3. **Outcome:** Registration confirmed; event appears in calendar sidebar

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Personalized feed renders with real data
- [ ] In-progress and recommended courses render correctly
- [ ] Course enrollment and continue flows work end-to-end
- [ ] LiveEventBanner shows for upcoming sessions; hides when none
- [ ] Badges and certificates display correctly
- [ ] Category filter and search work
- [ ] Mandatory courses have visual indicators
- [ ] Calendar sidebar shows upcoming events
- [ ] Responsive on mobile


---

# Milestone 5: Marketplace

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## Goal

Implement the Marketplace seller dashboard — an analytics and commerce management hub connected to ONDC.

## Overview

The Marketplace seller dashboard gives women entrepreneurs full visibility into their store performance. It shows revenue, order, views, and conversion metrics with 30-day charts, AI-powered insights with actionable recommendations, top product rankings, keyword tracking, and recent order management. The screen design provided covers the seller experience inside the app shell.

**Key Functionality:**
- Analytics overview with 4 key metrics and change indicators (30-day period)
- Revenue line/bar chart and traffic sources breakdown
- AI Insights panel with opportunity alerts and optimization suggestions
- Top products table ranked by revenue
- Keyword rankings with trend arrows (for ONDC/search visibility)
- Recent orders table with status and quick actions
- Low stock alert banner when inventory is running low
- Quick actions: Create Listing and Go Live buttons
- Export analytics to CSV/PDF

## Recommended Approach: Test-Driven Development

See `product-plan/sections/marketplace/tests.md` for detailed test-writing instructions including:
- Analytics data display with Indian number formatting
- AI insight action callbacks
- Order management interactions
- Low stock alert rendering
- Empty states (no insights, no orders, no low stock)

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/marketplace/components/`:

- `SellerDashboard` — Main analytics and management dashboard
- `StatCard` — Individual metric card with change percentage
- `RevenueChart` — 30-day revenue visualization
- `TrafficSourcesChart` — Traffic breakdown (ONDC, Direct, Social, etc.)
- `AIInsightCard` — Individual AI recommendation card
- `TopProductsTable` — Top revenue products
- `KeywordRankingsTable` — Keyword/search ranking tracker
- `RecentOrdersTable` — Latest orders with status
- `QuickActions` — Create Listing + Go Live CTA bar

### Data Layer

The `SellerDashboard` component expects (see `types.ts`):

- `sellerProfile` — Store name, bio, location, ONDC registration status
- `analyticsSummary` — Metrics overview, top products, traffic sources, revenue by day, AI insights, keyword rankings
- `recentOrders` — Latest 5-10 orders
- `lowStockListings` — Listings where `inventory.quantity <= inventory.lowStockThreshold`

### API Endpoints to Build

```
GET  /api/seller/profile            → Seller profile data
GET  /api/seller/analytics          → Analytics summary (30-day default)
GET  /api/seller/orders             → Order list (paginated)
GET  /api/seller/listings           → Listing list with inventory
GET  /api/seller/listings/low-stock → Listings below stock threshold
POST /api/seller/listings           → Create new listing
POST /api/seller/live               → Start live session
GET  /api/seller/analytics/export   → Export analytics data
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onViewOrder(orderId)` | Navigate to order detail page |
| `onViewListing(listingId)` | Navigate to listing edit page |
| `onCreateListing()` | Open listing creation form |
| `onGoLive()` | Start live selling session |
| `onViewAllOrders()` | Navigate to full orders list |
| `onViewAllListings()` | Navigate to full listings page |
| `onInsightAction(insight)` | Execute the AI insight action (e.g., open listing form) |
| `onExportAnalytics()` | Download analytics CSV/PDF |

### ONDC Integration

The Marketplace connects to India's Open Network for Digital Commerce (ONDC):
- Listings sync bidirectionally with the ONDC network
- Orders can come from ONDC buyers (not just direct)
- `sellerProfile.ondcRegistered` and `ondcSellerId` track ONDC status
- Discuss ONDC integration details with stakeholders — this may be a Phase 2 feature

### Indian Currency Formatting

All currency values must be formatted in Indian style:
- Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`
- Example: 125000 → "₹1,25,000" (not "₹125,000")

### Empty States

- **No AI insights:** AI Insights panel doesn't render
- **No recent orders:** RecentOrdersTable shows "No orders yet — your first order will appear here"
- **No low stock listings:** Low stock alert doesn't render

## Files to Reference

- `product-plan/sections/marketplace/README.md` — Feature overview
- `product-plan/sections/marketplace/tests.md` — Test-writing instructions
- `product-plan/sections/marketplace/components/` — React components
- `product-plan/sections/marketplace/types.ts` — TypeScript interfaces
- `product-plan/sections/marketplace/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Store Performance

1. Seller opens the Marketplace section
2. Dashboard loads with 30-day analytics
3. Seller sees revenue chart with daily data points
4. Seller sees traffic breakdown: 45% ONDC, 30% Direct, 25% Social
5. **Outcome:** At-a-glance understanding of store health

### Flow 2: Act on AI Insight

1. Seller sees an opportunity insight: "Add 3 more products — sellers with 10+ earn 40% more"
2. Seller clicks the insight's action button "Create Listing"
3. **Outcome:** `onCreateListing` is called; listing creation form opens

### Flow 3: Manage a Recent Order

1. Seller sees an order in "placed" status in the recent orders table
2. Seller clicks the order row to view details
3. Seller updates status to "confirmed"
4. **Outcome:** Order status updates; buyer receives notification

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Analytics dashboard renders with real data
- [ ] Revenue and traffic charts display correctly
- [ ] AI insights render with working action callbacks
- [ ] Orders table shows with correct status styling
- [ ] Low stock alert renders when applicable; hidden when not
- [ ] Create Listing and Go Live buttons work
- [ ] Export analytics triggers download
- [ ] Indian currency formatting (₹1,25,000 style) applied throughout
- [ ] Responsive on mobile


---

# Milestone 6: Financing

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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


---
