'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlinePlay,
  HiOutlineCheckCircle,
} from 'react-icons/hi2'
import type { Course, UserProgress } from '@/components/elearning/types'

const CATEGORY_LABELS: Record<string, string> = {
  'digital-literacy': 'Digital Literacy',
  'business': 'Business',
  'communication': 'Communication',
  'personal-finance': 'Personal Finance',
  'cyber-security': 'Cyber Security',
  'entrepreneurship': 'Entrepreneurship',
}

const CATEGORY_COLORS: Record<string, string> = {
  'digital-literacy': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'business': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'communication': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'personal-finance': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'cyber-security': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'entrepreneurship': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

export function CourseDetailClient({
  course,
  progress,
}: {
  course: Course
  progress: UserProgress | null
}) {
  const router = useRouter()
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(!!progress)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const isCompleted = currentProgress?.status === 'completed'
  const isInProgress = currentProgress?.status === 'in-progress'
  const isEnrolled = enrolled || !!currentProgress

  const handleEnroll = useCallback(async () => {
    setEnrolling(true)
    try {
      const res = await fetch(`/api/courses/${course.id}/enroll`, { method: 'POST' })
      if (!res.ok) return
      const newProgress: UserProgress = await res.json()
      setCurrentProgress(newProgress)
      setEnrolled(true)
      router.push(`/elearning/courses/${course.id}/play`)
    } finally {
      setEnrolling(false)
    }
  }, [course.id, router])

  const handleContinue = useCallback(() => {
    router.push(`/elearning/courses/${course.id}/play`)
  }, [course.id, router])

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6">
        <Link
          href="/elearning"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Learning
        </Link>

        {/* Course hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 p-8 text-white mb-6 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dots)" />
            </svg>
          </div>
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[course.category] ?? 'bg-stone-700 text-base-content/30'}`}>
                {CATEGORY_LABELS[course.category] ?? course.category}
              </span>
              {course.isMandatory && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-content">
                  Required
                </span>
              )}
              {course.isTrending && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/80 text-white">
                  Trending
                </span>
              )}
              {isCompleted && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                  <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold leading-snug mb-3">{course.title}</h1>
            <p className="text-white/70 text-sm leading-relaxed mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-base-content/30">
              <span className="flex items-center gap-1.5">
                <HiOutlineClock className="w-4 h-4" />
                {formatDuration(course.duration)}
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineAcademicCap className="w-4 h-4" />
                {course.totalModules} modules
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineStar className="w-4 h-4 text-amber-400" />
                {course.rating} rating
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineUsers className="w-4 h-4" />
                {formatCount(course.enrolledCount)} enrolled
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar for in-progress */}
        {isInProgress && currentProgress && (
          <div className="bg-base-100 rounded-2xl p-5 mb-6 shadow-sm ring-1 ring-base-300">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-base-content/80">Your progress</span>
              <span className="font-semibold text-primary">{currentProgress.percentComplete}%</span>
            </div>
            <div className="h-2.5 bg-base-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all"
                style={{ width: `${currentProgress.percentComplete}%` }}
              />
            </div>
            <p className="text-xs text-base-content/40">
              {currentProgress.completedModules} of {course.totalModules} modules completed
            </p>
          </div>
        )}

        {/* About */}
        <div className="bg-base-100 rounded-2xl p-5 mb-6 shadow-sm ring-1 ring-base-300">
          <h2 className="font-semibold text-base-content mb-3">About this course</h2>
          <p className="text-sm text-base-content/60 leading-relaxed mb-4">
            {course.description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-base-content/40 mb-0.5">Instructor</p>
              <p className="font-medium text-base-content/80">{course.instructorName}</p>
            </div>
            <div>
              <p className="text-xs text-base-content/40 mb-0.5">Level</p>
              <p className="font-medium text-base-content/80 capitalize">{course.level}</p>
            </div>
            <div>
              <p className="text-xs text-base-content/40 mb-0.5">Format</p>
              <p className="font-medium text-base-content/80 capitalize">{course.format}</p>
            </div>
            <div>
              <p className="text-xs text-base-content/40 mb-0.5">Language</p>
              <p className="font-medium text-base-content/80 capitalize">{course.language}</p>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="bg-base-100 rounded-2xl p-5 mb-24 shadow-sm ring-1 ring-base-300">
          <h2 className="font-semibold text-base-content mb-4">
            Curriculum · {course.totalModules} lessons
          </h2>
          {course.chapters ? (
            <div className="space-y-4">
              {(() => {
                let lessonIndex = 0
                return course.chapters!.map((chapter, ci) => (
                  <div key={ci}>
                    <p className="text-[11px] font-semibold text-base-content/40 uppercase tracking-widest mb-2 px-1">
                      Chapter {ci + 1} · {chapter.title}
                    </p>
                    <div className="space-y-1">
                      {chapter.lessons.map((lesson) => {
                        const li = lessonIndex++
                        const done = currentProgress && li < currentProgress.completedModules
                        const isCurrent = currentProgress && li === currentProgress.completedModules && !isCompleted
                        return (
                          <div
                            key={li}
                            className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-colors ${
                              isCurrent
                                ? 'bg-primary/5 ring-1 ring-primary/20'
                                : 'hover:bg-base-200/60'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              done
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-primary text-primary-content'
                                : 'border-2 border-base-300 text-base-content/40'
                            }`}>
                              {done ? '✓' : li + 1}
                            </div>
                            <span className={`flex-1 min-w-0 ${done ? 'text-base-content/35 line-through' : 'text-base-content/80'}`}>
                              {lesson.title}
                            </span>
                            <span className="text-[11px] text-base-content/40 flex-shrink-0">
                              {lesson.duration} min
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-semibold text-primary uppercase tracking-wide flex-shrink-0">
                                Up next
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              })()}
            </div>
          ) : (
            <div className="space-y-2">
              {Array.from({ length: course.totalModules }, (_, i) => {
                const done = currentProgress && i < currentProgress.completedModules
                const isCurrent = currentProgress && i === currentProgress.completedModules && !isCompleted
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-colors ${
                      isCurrent
                        ? 'bg-primary/5 ring-1 ring-primary/20'
                        : 'hover:bg-base-200/60'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      done
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-primary text-primary-content'
                        : 'border-2 border-base-300 text-base-content/40'
                    }`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className={done ? 'text-base-content/35 line-through' : 'text-base-content/80'}>
                      {i === 0 ? 'Introduction' : i === course.totalModules - 1 ? 'Conclusion & Next Steps' : `Module ${i + 1}`}
                    </span>
                    {isCurrent && (
                      <span className="ml-auto text-[10px] font-semibold text-primary uppercase tracking-wide">
                        Up next
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90/90 backdrop-blur-md border-t border-base-300 z-40">
          <div className="max-w-3xl mx-auto">
            {isCompleted ? (
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-base-300 hover:bg-base-200 text-base-content font-semibold rounded-2xl transition-colors"
              >
                <HiOutlineAcademicCap className="w-5 h-5" />
                Review Course
              </button>
            ) : isInProgress || isEnrolled ? (
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-sm transition-all hover:shadow-md"
              >
                <HiOutlinePlay className="w-5 h-5" />
                Continue Learning
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-sm transition-all hover:shadow-md disabled:opacity-60"
              >
                {enrolling ? (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <HiOutlinePlay className="w-5 h-5" />
                )}
                Enroll Free · Start Learning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
