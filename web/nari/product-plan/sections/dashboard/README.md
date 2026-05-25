# Dashboard

## Overview

The Dashboard is the default landing view after login, serving as the user's command center for her entire journey on the platform. For first-time users, it presents a guided onboarding flow to complete key setup steps. For returning users, it surfaces live activity metrics, a motivational milestone view, AI agent summaries, and platform/personal announcements.

## User Flows

- First-time user lands → sees onboarding checklist (complete skill discovery, create first listing, explore financing) → completes steps one by one → checklist collapses once all steps are done
- Returning user lands → views earnings snapshot, pending orders, courses in progress, and loan status at a glance
- User taps "Resume last course" quick action → navigates to eLearning
- User taps "Add/edit product listing" quick action → navigates to Marketplace
- User taps "Check loan status/apply" quick action → navigates to Financing
- User taps "Start skill assessment" quick action → navigates to Skill Discovery
- User reads AI agent summary card → sees recent agentic actions + smart recommendations
- User reads announcement banner → sees platform-wide or personalized alert

## Design Decisions

- Warm rose-to-amber gradient hero section creates emotional warmth; user name prominently displayed
- Cards surface below the hero with a `-mt-10` overlap for depth
- OnboardingChecklist only renders when `allOnboardingComplete` is false — collapses automatically
- AnnouncementsBar only renders for unread announcements
- Streak + Milestones | AI Agent displayed side-by-side on md+ screens

## Data Used

**Entities:** User, DashboardMetrics, Streak, Milestone, NextGoal, AgentAction, Recommendation, Announcement, OnboardingStep

**From global model:** User

## Components Provided

- `Dashboard` — Main layout orchestrator
- `MetricsRow` — Live KPI cards (earnings, orders, courses, loan status)
- `OnboardingChecklist` — First-time user setup guide
- `AnnouncementsBar` — Stacked platform and personalized alerts
- `StreakCard` — Learning streak tracker with weekly activity dots
- `MilestonesCard` — Achievement badges with locked/unlocked state
- `NextGoalCard` — Contextual nudge to the user's best next action
- `AgentSummaryCard` — AI actions feed + smart recommendations
- `QuickActionsBar` — 4 icon-button shortcuts to key sections

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigateTo(section)` | Navigate to a section (e.g., `'skill-discovery'`, `'marketplace'`) |
| `onCompleteOnboardingStep(stepId)` | Mark an onboarding step as done |
| `onDismissAnnouncement(id)` | Remove an announcement from view |
| `onMarkAnnouncementRead(id)` | Mark announcement as read without dismissing |
