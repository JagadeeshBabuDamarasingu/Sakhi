import type { DashboardProps } from '../types'
import { AnnouncementsBar } from './AnnouncementsBar'
import { OnboardingChecklist } from './OnboardingChecklist'
import { MetricsRow } from './MetricsRow'
import { NextGoalCard } from './NextGoalCard'
import { StreakCard } from './StreakCard'
import { MilestonesCard } from './MilestonesCard'
import { AgentSummaryCard } from './AgentSummaryCard'
import { QuickActionsBar } from './QuickActionsBar'

export function Dashboard({
  user,
  onboardingSteps,
  metrics,
  streak,
  milestones,
  nextGoal,
  agentActions,
  recommendations,
  announcements,
  onNavigateTo,
  onCompleteOnboardingStep,
  onDismissAnnouncement,
  onMarkAnnouncementRead,
}: DashboardProps) {
  const unreadAnnouncements = announcements.filter((a) => !a.isRead)
  const allOnboardingComplete = onboardingSteps.every((s) => s.completed)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Warm gradient hero */}
      <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-amber-400 px-4 pt-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-rose-100 text-sm font-medium mb-0.5">Welcome back</p>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-rose-100/80 text-xs mt-0.5">
            {user.city} · Member since {new Date(user.memberSince).getFullYear()}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10 pb-8 space-y-4">
        {/* Announcements */}
        {unreadAnnouncements.length > 0 && (
          <AnnouncementsBar
            announcements={unreadAnnouncements}
            onDismiss={onDismissAnnouncement}
            onMarkRead={onMarkAnnouncementRead}
          />
        )}

        {/* Onboarding checklist — only for first-time users */}
        {!allOnboardingComplete && (
          <OnboardingChecklist
            steps={onboardingSteps}
            onComplete={onCompleteOnboardingStep}
            onNavigateTo={onNavigateTo}
          />
        )}

        {/* Live metrics */}
        <MetricsRow metrics={metrics} />

        {/* Next goal nudge */}
        <NextGoalCard nextGoal={nextGoal} onNavigateTo={onNavigateTo} />

        {/* Streak + Milestones | AI Agent — side by side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <StreakCard streak={streak} />
            <MilestonesCard milestones={milestones} />
          </div>
          <AgentSummaryCard
            agentActions={agentActions}
            recommendations={recommendations}
            onNavigateTo={onNavigateTo}
          />
        </div>

        {/* Quick actions */}
        <QuickActionsBar onNavigateTo={onNavigateTo} />
      </div>
    </div>
  )
}
