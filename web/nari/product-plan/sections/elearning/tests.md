# Test Instructions: eLearning

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The eLearning section provides a personalized learning feed with courses, live events, badges, and a calendar. Key flows to test: personalized feed rendering, course enrollment, live session registration, badge sharing, and category filtering.

---

## User Flow Tests

### Flow 1: View Personalized Learning Feed

**Setup:**
- `courses` has 6 courses (2 in-progress, 2 trending, 4 recommended)
- `userProgress` has entries for the 2 in-progress courses
- `userStats.currentStreak: 5`, `userStats.coursesCompleted: 3`

**Expected Results:**
- [ ] "Continue Learning" section shows 2 in-progress courses
- [ ] Stats grid shows: Completed = 3, In Progress = 2, current streak = 5
- [ ] "Trending Now" section shows trending courses
- [ ] "Recommended for You" section shows courses not yet enrolled

---

### Flow 2: Enroll in a Course

**Setup:**
- `courses` has a course not in `userProgress` (not yet enrolled)

**Steps:**
1. User sees a CourseCard for an unenrolled course
2. User clicks "Enroll" button on the card

**Expected Results:**
- [ ] CourseCard renders with an "Enroll" CTA (not "Continue")
- [ ] Clicking "Enroll" calls `onEnrollCourse` with the correct course id
- [ ] (After backend confirms) course appears in "Continue Learning"

---

### Flow 3: Continue an In-Progress Course

**Setup:**
- `userProgress` has an entry with `status: 'in-progress'` and `percentComplete: 40`

**Steps:**
1. User sees the in-progress CourseCard with a progress bar at 40%
2. User clicks "Continue"

**Expected Results:**
- [ ] CourseCard shows progress bar at 40%
- [ ] "Continue" button is visible (not "Enroll")
- [ ] Clicking "Continue" calls `onContinueCourse` with correct course id

---

### Flow 4: Register for Live Session

**Setup:**
- `liveSessions` has 1 upcoming session with `isUpcoming: true`

**Steps:**
1. LiveEventBanner appears at top of page with session details
2. User clicks "Register" button

**Expected Results:**
- [ ] LiveEventBanner renders with session title, speaker name, date/time
- [ ] "Register" button calls `onRegisterSession` with correct session id

---

### Flow 5: Filter Courses by Category

**Steps:**
1. User sees CategoryPills with category options
2. User clicks "Business" category pill

**Expected Results:**
- [ ] "Business" pill becomes visually active (highlighted)
- [ ] `onFilterByCategory` is called with `'business'`
- [ ] Clicking the same pill again deactivates it

---

### Flow 6: Share a Badge

**Setup:**
- `badges` has 2 earned badges

**Steps:**
1. User sees BadgeDisplay in sidebar with 2 badges
2. User clicks Share on a badge

**Expected Results:**
- [ ] BadgeDisplay renders with 2 badge cards
- [ ] Share button calls `onShareBadge` with correct badge id

---

## Empty State Tests

### No In-Progress Courses

**Setup:** No course in `userProgress` with `status: 'in-progress'` or `'enrolled'`

**Expected Results:**
- [ ] "Continue Learning" section does NOT render
- [ ] "Trending Now" and "Recommended" sections still render normally

### No Upcoming Live Sessions

**Setup:** `liveSessions` is empty or all have `isUpcoming: false`

**Expected Results:**
- [ ] LiveEventBanner does NOT render
- [ ] Rest of page renders normally

### No Badges Earned

**Setup:** `badges: []`

**Expected Results:**
- [ ] BadgeDisplay renders an empty state message (e.g., "Complete courses to earn badges")
- [ ] No broken layouts or errors

### No Upcoming Calendar Events

**Setup:** All `calendarEvents` have `isCompleted: true`

**Expected Results:**
- [ ] "Upcoming" sidebar section shows "No upcoming events" message
- [ ] No blank cards

### No Recommended Courses

**Setup:** All courses are in `userProgress` (all enrolled)

**Expected Results:**
- [ ] "Recommended for You" section does NOT render
- [ ] Rest of page renders normally

---

## Component Interaction Tests

### CourseCard

- [ ] Renders course title, category badge, duration, and level
- [ ] Shows progress bar when `progress.percentComplete` is provided
- [ ] Shows "Enroll" button when no progress entry
- [ ] Shows "Continue" button when progress exists
- [ ] Clicking card area calls `onViewCourse`

### StatCard

- [ ] Renders label and value correctly
- [ ] Shows `trend` text when provided
- [ ] Renders icon element without errors

### LiveEventBanner

- [ ] Shows session title, type (bootcamp/guest speaker/workshop)
- [ ] Shows speaker name and avatar/initials when speaker is provided
- [ ] Shows formatted date and time
- [ ] "Register" button is prominent and accessible

---

## Edge Cases

- [ ] Course with very long title truncates gracefully in CourseCard
- [ ] `userStats.totalLearningMinutes: 0` shows "0m" not blank
- [ ] `userStats.currentStreak: 0` doesn't show a "best" streak comparison
- [ ] `certificates: []` — certificate highlight card in sidebar doesn't render
- [ ] `certificates` with 1+ entries — shows the latest certificate with Share button

---

## Accessibility Checks

- [ ] Search input has visible label or placeholder
- [ ] CategoryPills are keyboard navigable
- [ ] CourseCard action buttons have descriptive text
- [ ] Badge share buttons have aria-labels

---

## Sample Test Data

```typescript
const mockCourse = {
  id: 'course-001',
  title: 'Digital Marketing for Women Entrepreneurs',
  description: 'Learn to market your products and services online',
  category: 'business' as const,
  duration: 180,
  totalModules: 8,
  format: 'mixed' as const,
  level: 'beginner' as const,
  language: 'hi',
  isMandatory: false,
  isTrending: true,
  thumbnailUrl: 'https://example.com/thumb.jpg',
  instructorName: 'Neha Gupta',
  rating: 4.8,
  enrolledCount: 12500,
}

const mockProgress = {
  id: 'prog-001',
  courseId: 'course-001',
  completedModules: 3,
  percentComplete: 37,
  lastAccessedAt: '2026-05-20T10:00:00Z',
  status: 'in-progress' as const,
  enrolledAt: '2026-05-01T00:00:00Z',
}

const mockBadge = {
  id: 'badge-001',
  title: 'First Course Completed',
  description: 'Completed your first eLearning course',
  iconUrl: 'https://example.com/badge.svg',
  earnedAt: '2026-05-15T00:00:00Z',
  courseId: 'course-001',
  shareUrl: 'https://shakti.app/badges/badge-001',
}

// Empty states
const emptyUserProgress = []
const emptyBadges = []
const emptyLiveSessions = []
```
