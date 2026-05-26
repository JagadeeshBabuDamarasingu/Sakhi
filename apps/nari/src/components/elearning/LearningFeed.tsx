'use client'

import { useState } from 'react'
import type { ELearningProps, CourseCategory } from './types'
import { StatCard } from './StatCard'
import { CourseCard } from './CourseCard'
import { LiveEventBanner } from './LiveEventBanner'
import { CategoryPills } from './CategoryPills'
import { BadgeDisplay } from './BadgeDisplay'

export function LearningFeed({
  courses,
  speakers,
  liveSessions,
  userProgress,
  learningGoals,
  badges,
  certificates,
  calendarEvents,
  categories,
  userStats,
  onViewCourse,
  onEnrollCourse,
  onContinueCourse,
  onViewSession,
  onRegisterSession,
  onShareBadge,
  onFilterByCategory,
  onSearch,
  onOpenCalendar,
}: ELearningProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CourseCategory | null>(null)

  const nextSession = liveSessions
    .filter((s) => s.isUpcoming)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0]

  const nextSessionSpeaker = nextSession?.speakerId
    ? speakers.find((s) => s.id === nextSession.speakerId)
    : undefined

  const inProgressCourses = courses.filter((course) => {
    const progress = userProgress.find((p) => p.courseId === course.id)
    return progress && (progress.status === 'in-progress' || progress.status === 'enrolled')
  })

  const recommendedCourses = courses
    .filter((course) => !userProgress.find((p) => p.courseId === course.id))
    .slice(0, 4)

  const trendingCourses = courses.filter((c) => c.isTrending)

  const formatLearningTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const upcomingEvents = calendarEvents
    .filter((e) => !e.isCompleted)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3)

  const handleCategorySelect = (category: CourseCategory) => {
    setActiveCategory(activeCategory === category ? null : category)
    onFilterByCategory?.(category)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-white sm:text-3xl">
                Learn & Grow
              </h1>
              <p className="mt-1 text-stone-600 dark:text-stone-400">
                Free courses to build your skills and business
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 shadow-sm ring-1 ring-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-rose-500 dark:bg-stone-900 dark:text-white dark:ring-stone-700 dark:placeholder:text-stone-500"
              />
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>
        </div>

        {/* Live Event Banner */}
        {nextSession && (
          <div className="mb-8">
            <LiveEventBanner
              session={nextSession}
              speaker={nextSessionSpeaker}
              onRegister={() => onRegisterSession?.(nextSession.id)}
              onView={() => onViewSession?.(nextSession.id)}
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label="Completed"
            value={userStats.coursesCompleted}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="In Progress"
            value={userStats.coursesInProgress}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Learning Time"
            value={formatLearningTime(userStats.totalLearningMinutes)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <StatCard
            label="Day Streak"
            value={userStats.currentStreak}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            }
            trend={userStats.currentStreak > 0 ? `Best: ${userStats.longestStreak} days` : undefined}
          />
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Continue Learning */}
            {inProgressCourses.length > 0 && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                    Continue Learning
                  </h2>
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {inProgressCourses.length} courses
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {inProgressCourses.map((course) => {
                    const progress = userProgress.find((p) => p.courseId === course.id)
                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        progress={progress}
                        onView={() => onViewCourse?.(course.id)}
                        onContinue={() => onContinueCourse?.(course.id)}
                      />
                    )
                  })}
                </div>
              </section>
            )}

            {/* Browse by Category */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-stone-900 dark:text-white">
                Browse by Category
              </h2>
              <CategoryPills
                categories={categories}
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
              />
            </section>

            {/* Trending Courses */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                  Trending Now
                </h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trendingCourses.slice(0, 4).map((course) => {
                  const progress = userProgress.find((p) => p.courseId === course.id)
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      progress={progress}
                      onView={() => onViewCourse?.(course.id)}
                      onContinue={() => onContinueCourse?.(course.id)}
                      onEnroll={() => onEnrollCourse?.(course.id)}
                    />
                  )
                })}
              </div>
            </section>

            {/* Recommended for You */}
            {recommendedCourses.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                    Recommended for You
                  </h2>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Based on your goals
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {recommendedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onView={() => onViewCourse?.(course.id)}
                      onEnroll={() => onEnrollCourse?.(course.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BadgeDisplay badges={badges} onShare={onShareBadge} />

            {/* Upcoming Events */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-stone-900 dark:text-white">Upcoming</h3>
                <button
                  onClick={onOpenCalendar}
                  className="text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                >
                  View Calendar
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.scheduledAt)
                  const isToday = eventDate.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={event.id}
                      className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
                    >
                      <div className={`flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl text-center ${
                        isToday
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                          : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}>
                        <span className="text-[10px] font-medium uppercase">
                          {eventDate.toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="text-lg font-bold leading-none">
                          {eventDate.getDate()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate dark:text-white">
                          {event.title}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {eventDate.toLocaleTimeString('en-IN', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                      </div>

                      <div className={`flex-shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                        event.type === 'live-session' || event.type === 'bootcamp'
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                          : event.type === 'deadline'
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}>
                        {event.type === 'live-session' ? 'Live' :
                         event.type === 'bootcamp' ? 'Bootcamp' :
                         event.type === 'deadline' ? 'Due' : 'Reminder'}
                      </div>
                    </div>
                  )
                })}

                {upcomingEvents.length === 0 && (
                  <p className="text-center text-sm text-stone-500 dark:text-stone-400">
                    No upcoming events
                  </p>
                )}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
              <h3 className="font-semibold text-stone-900 dark:text-white">Your Goals</h3>

              <div className="mt-4 space-y-3">
                {learningGoals
                  .filter((g) => g.isActive)
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 p-3 dark:from-rose-900/20 dark:to-amber-900/20"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-rose-500 shadow-sm dark:bg-stone-800 dark:text-rose-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900 dark:text-white">{goal.title}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{goal.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Certificate highlight */}
            {certificates.length > 0 && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-rose-500 p-5 text-white shadow-lg">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/10 blur-xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">Latest Certificate</p>
                      <p className="font-semibold">{certificates[0].title}</p>
                    </div>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/30">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Achievement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
