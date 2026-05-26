'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dashboard } from './Dashboard'
import type { AgentAction, DashboardData, Recommendation } from './types'

export function DashboardClient({ data }: { data: DashboardData }) {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState(data.announcements)
  const [onboardingSteps, setOnboardingSteps] = useState(data.onboardingSteps)
  const [agentActions, setAgentActions] = useState(data.agentActions)
  const [recommendations, setRecommendations] = useState(data.recommendations)

  useEffect(() => {
    let cancelled = false

    async function loadAiFeeds() {
      const [actionsRes, recommendationsRes] = await Promise.all([
        fetch('/api/ai/actions'),
        fetch('/api/ai/recommendations'),
      ])

      if (cancelled) return

      if (actionsRes.ok) {
        const nextActions = (await actionsRes.json()) as AgentAction[]
        if (nextActions.length > 0) setAgentActions(nextActions)
      }

      if (recommendationsRes.ok) {
        const nextRecommendations = (await recommendationsRes.json()) as Recommendation[]
        if (nextRecommendations.length > 0) setRecommendations(nextRecommendations)
      }
    }

    loadAiFeeds().catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  const handleNavigateTo = useCallback(
    (section: string) => {
      router.push(`/${section}`)
    },
    [router]
  )

  const handleDismissAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    fetch(`/api/announcements/${id}`, { method: 'DELETE' }).catch(() => {})
  }, [])

  const handleMarkAnnouncementRead = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    )
    fetch(`/api/announcements/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'read' }),
    }).catch(() => {})
  }, [])

  const handleCompleteOnboardingStep = useCallback((stepId: string) => {
    setOnboardingSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: true } : s))
    )
    fetch(`/api/onboarding/${stepId}`, { method: 'PATCH' }).catch(() => {})
  }, [])

  return (
    <Dashboard
      user={data.user}
      onboardingSteps={onboardingSteps}
      metrics={data.metrics}
      streak={data.streak}
      milestones={data.milestones}
      nextGoal={data.nextGoal}
      agentActions={agentActions}
      recommendations={recommendations}
      announcements={announcements}
      onNavigateTo={handleNavigateTo}
      onCompleteOnboardingStep={handleCompleteOnboardingStep}
      onDismissAnnouncement={handleDismissAnnouncement}
      onMarkAnnouncementRead={handleMarkAnnouncementRead}
    />
  )
}
