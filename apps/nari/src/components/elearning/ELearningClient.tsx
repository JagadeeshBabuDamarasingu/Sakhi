'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LearningFeed } from './LearningFeed'
import type { ELearningProps, UserProgress, CalendarEvent } from './types'
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineXMark } from 'react-icons/hi2'

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

interface CoachRecommendation {
  courseId: string
  title: string
  reason: string
  message: string
}

export function ELearningClient({ data }: { data: ELearningData }) {
  const router = useRouter()
  const [userProgress, setUserProgress] = useState(data.userProgress)
  const [calendarEvents, setCalendarEvents] = useState(data.calendarEvents)
  const [coachRec, setCoachRec] = useState<CoachRecommendation | null>(null)
  const [coachDismissed, setCoachDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/ai/learning/coach', { method: 'POST' })
      .then((res) => (res.ok ? res.json() : null))
      .then((result: { message: string; recommendation: CoachRecommendation } | null) => {
        if (result?.recommendation) {
          setCoachRec({ ...result.recommendation, message: result.message })
        }
      })
      .catch(() => {})
  }, [])

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
    <>
      {coachRec && !coachDismissed && (
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 flex items-start gap-3 px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-2xl">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mt-0.5">
            <HiOutlineSparkles className="w-4 h-4 text-primary" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
              AI Learning Coach
            </p>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {coachRec.message}
            </p>
            <button
              onClick={() => router.push(`/elearning/courses/${coachRec.courseId}`)}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Start {coachRec.title}
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setCoachDismissed(true)}
            className="flex-shrink-0 p-1 rounded-lg text-base-content/50 hover:text-base-content/80 hover:bg-base-200 transition-colors"
            aria-label="Dismiss recommendation"
          >
            <HiOutlineXMark className="w-4 h-4" />
          </button>
        </div>
      )}
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
    </>
  )
}
