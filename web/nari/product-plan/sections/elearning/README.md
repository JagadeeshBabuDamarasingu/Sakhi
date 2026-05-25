# eLearning

## Overview

eLearning is a free learning platform offering courses in business, communication, entrepreneurship, digital literacy, cyber security, and personal finance. It provides personalized learning paths based on user goals and literacy levels, with a mix of in-progress courses and recommendations. Users earn badges and certificates, can register for live events and bootcamps, and manage their learning through a calendar with reminders.

## User Flows

- **View personalized feed** — See in-progress courses, recommended courses, and learning stats
- **Explore courses** — Browse trending courses, filter by category, and search
- **Enroll in a course** — View course details, enroll, and start learning
- **Track progress** — View course progress, complete assessments, earn badges and certificates
- **Register for events** — View upcoming live sessions, bootcamps, and guest speakers and register
- **Share achievements** — Share badges and certificates on social media

## Design Decisions

- Main layout is two-column on desktop (lg:grid-cols-3): main content 2/3, sidebar 1/3
- LiveEventBanner prominently features the next upcoming session at the top
- Stats grid shows 4 key metrics in a compact 2×2 on mobile, 4×1 on desktop
- BadgeDisplay in sidebar; certificates shown as a highlighted gradient card
- Mandatory course indicators are important for compliance tracking

## Data Used

**Entities:** Course, Speaker, LiveSession, UserProgress, LearningGoal, Badge, Certificate, CalendarEvent, UserStats, Category

## Components Provided

- `LearningFeed` — Main layout with stats, in-progress courses, trending, recommendations
- `CourseCard` — Course card with progress bar, category badge, duration, and enroll/continue CTA
- `LiveEventBanner` — Prominent banner for next upcoming live session with speaker info
- `CategoryPills` — Horizontal scrollable category filter pills
- `BadgeDisplay` — Earned badges grid with social share buttons
- `StatCard` — Individual stat metric card

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewCourse(courseId)` | View course detail page |
| `onEnrollCourse(courseId)` | Enroll user in a course |
| `onContinueCourse(courseId)` | Continue an in-progress course |
| `onViewSession(sessionId)` | View live session details |
| `onRegisterSession(sessionId)` | Register for a live session |
| `onShareBadge(badgeId)` | Share a badge on social media |
| `onFilterByCategory(category)` | Filter courses by category |
| `onSearch(query)` | Search courses |
| `onOpenCalendar()` | Open learning calendar view |
