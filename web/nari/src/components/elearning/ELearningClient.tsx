'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LearningFeed } from './LearningFeed'
import type { ELearningProps, UserProgress, CalendarEvent } from './types'

type ELearningData = Omit<
  ELearningProps,
  | 'onViewCourse'
  | 'onEnrollCourse'
  | 'onContinueCourse'
  | 'onViewSession'
  | 'onRegisterSession'
  | 'onShareBadge'
  | 'onFilterByCategory'
  | 'onSearch'
  | 'onOpenCalendar'
  | 'onCompleteModule'
  | 'onCreateGoal'
  | 'onUpdateGoal'
  | 'onDeleteGoal'
  | 'onShareCertificate'
  | 'onDownloadCertificate'
  | 'onViewCalendarEvent'
  | 'onCompleteCalendarEvent'
  | 'onCancelRegistration'
>

export function ELearningClient({ data }: { data: ELearningData }) {
  const router = useRouter()
  const [userProgress, setUserProgress] = useState(data.userProgress)
  const [calendarEvents, setCalendarEvents] = useState(data.calendarEvents)

  const handleViewCourse = useCallback((courseId: string) => {
    router.push(`/elearning/courses/${courseId}`)
  }, [router])

  const handleEnrollCourse = useCallback(async (courseId: string) => {
    const res = await fetch(`/api/courses/${courseId}/enroll`, { method: 'POST' })
    if (res.ok) {
      const newProgress: UserProgress = await res.json()
      setUserProgress((prev) => [...prev, newProgress])
    }
  }, [])

  const handleContinueCourse = useCallback((courseId: string) => {
    router.push(`/elearning/courses/${courseId}/play`)
  }, [router])

  const handleViewSession = useCallback((sessionId: string) => {
    router.push(`/elearning/sessions/${sessionId}`)
  }, [router])

  const handleRegisterSession = useCallback(async (sessionId: string) => {
    const res = await fetch(`/api/live-sessions/${sessionId}/register`, { method: 'POST' })
    if (res.ok) {
      const { session } = await res.json()
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: `Live: ${session.title}`,
        type: session.type === 'bootcamp' ? 'bootcamp' : 'live-session',
        courseId: session.courseId,
        sessionId,
        scheduledAt: session.scheduledAt,
        isCompleted: false,
      }
      setCalendarEvents((prev) => [...prev, newEvent])
    }
  }, [])

  const handleShareBadge = useCallback((badgeId: string) => {
    const badge = data.badges.find((b) => b.id === badgeId)
    if (badge) {
      const shareUrl = `${window.location.origin}${badge.shareUrl}`
      if (navigator.share) {
        navigator.share({ title: badge.title, url: shareUrl }).catch(() => {})
      } else {
        navigator.clipboard.writeText(shareUrl).catch(() => {})
      }
    }
  }, [data.badges])

  const handleOpenCalendar = useCallback(() => {
    router.push('/elearning/calendar')
  }, [router])

  return (
    <LearningFeed
      {...data}
      userProgress={userProgress}
      calendarEvents={calendarEvents}
      onViewCourse={handleViewCourse}
      onEnrollCourse={handleEnrollCourse}
      onContinueCourse={handleContinueCourse}
      onViewSession={handleViewSession}
      onRegisterSession={handleRegisterSession}
      onShareBadge={handleShareBadge}
      onOpenCalendar={handleOpenCalendar}
    />
  )
}
