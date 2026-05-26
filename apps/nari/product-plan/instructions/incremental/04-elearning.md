# Milestone 4: eLearning

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
