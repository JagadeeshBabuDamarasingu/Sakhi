'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import type { Course, UserProgress } from '@/components/elearning/types'

function flattenLessons(course: Course): { title: string; chapter: string }[] {
  if (!course.chapters) {
    return Array.from({ length: course.totalModules }, (_, i) => ({
      title: i === 0 ? 'Introduction' : i === course.totalModules - 1 ? 'Conclusion & Next Steps' : `Module ${i + 1}`,
      chapter: '',
    }))
  }
  return course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ title: l.title, chapter: ch.title }))
  )
}

export function CoursePlayerClient({
  course,
  initialProgress,
}: {
  course: Course
  initialProgress: UserProgress | null
}) {
  const router = useRouter()
  const [completedModules, setCompletedModules] = useState(
    initialProgress?.completedModules ?? 0
  )
  const [activeModule, setActiveModule] = useState(
    Math.min(initialProgress?.completedModules ?? 0, course.totalModules - 1)
  )
  const [saving, setSaving] = useState(false)
  const [finished, setFinished] = useState(initialProgress?.status === 'completed')

  const lessons = flattenLessons(course)
  const percentComplete = Math.round((completedModules / course.totalModules) * 100)

  const handleComplete = useCallback(async () => {
    const newCompleted = activeModule + 1
    if (newCompleted <= completedModules) {
      if (activeModule < course.totalModules - 1) setActiveModule(activeModule + 1)
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/courses/${course.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedModules: newCompleted }),
      })
      if (!res.ok) return
      setCompletedModules(newCompleted)
      if (newCompleted >= course.totalModules) {
        setFinished(true)
      } else {
        setActiveModule(newCompleted)
      }
    } finally {
      setSaving(false)
    }
  }, [activeModule, completedModules, course.id, course.totalModules])

  if (finished) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200 dark:shadow-amber-900/30">
            <HiOutlineTrophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            Course complete!
          </h1>
          <p className="text-base-content/50 mb-2">{course.title}</p>
          <p className="text-sm text-base-content/40 mb-8 leading-relaxed">
            You&apos;ve completed all {course.totalModules} modules. Your certificate has been
            added to your achievements.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/elearning')}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-2xl transition-all shadow-sm hover:shadow-md"
            >
              Back to Learning Hub
            </button>
            <Link
              href={`/elearning/courses/${course.id}`}
              className="w-full py-3 bg-base-200 hover:bg-base-200 text-base-content/80 font-medium rounded-2xl transition-colors text-center text-sm"
            >
              Review course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isDone = activeModule < completedModules

  return (
    <div className="min-h-screen bg-base-200">
      {/* Progress header */}
      <div className="bg-base-100 border-b border-base-300 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link
            href={`/elearning/courses/${course.id}`}
            className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content/70 hover:bg-base-200 transition-colors flex-shrink-0"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-base-content/40 truncate">{course.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-base-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-base-content/50 flex-shrink-0">
                {percentComplete}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Module list sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-base-100 rounded-2xl ring-1 ring-base-300 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100">
              <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest">
                {course.totalModules} lessons
              </p>
            </div>
            <nav className="py-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {course.chapters ? (
                (() => {
                  let li = 0
                  return course.chapters!.map((ch, ci) => (
                    <div key={ci}>
                      <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-base-content/40 uppercase tracking-widest">
                        {ch.title}
                      </p>
                      {ch.lessons.map((lesson) => {
                        const idx = li++
                        const done = idx < completedModules
                        const isActive = idx === activeModule
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveModule(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                              isActive
                                ? 'bg-primary/5 text-primary'
                                : done
                                ? 'text-base-content/35 hover:bg-base-200/60'
                                : 'text-base-content/80 hover:bg-base-200/60'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold ${
                              done
                                ? 'bg-emerald-500 text-white'
                                : isActive
                                ? 'bg-primary text-primary-content'
                                : 'border-2 border-base-300 text-base-content/40'
                            }`}>
                              {done ? '✓' : idx + 1}
                            </span>
                            <span className={`flex-1 min-w-0 leading-snug ${done ? 'line-through' : ''}`}>{lesson.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  ))
                })()
              ) : (
                lessons.map((lesson, i) => {
                  const done = i < completedModules
                  const isActive = i === activeModule
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveModule(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-primary/5 text-primary'
                          : done
                          ? 'text-base-content/35 hover:bg-base-200/60'
                          : 'text-base-content/80 hover:bg-base-200/60'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold ${
                        done
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-primary text-primary-content'
                          : 'border-2 border-base-300 text-base-content/40'
                      }`}>
                        {done ? '✓' : i + 1}
                      </span>
                      <span className={done ? 'line-through' : ''}>{lesson.title}</span>
                    </button>
                  )
                })
              )}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Content area */}
          <div className="bg-base-100 rounded-2xl ring-1 ring-base-300 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="player-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.8" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#player-dots)" />
                </svg>
              </div>
              <div className="relative text-center px-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">{course.title}</p>
                <p className="text-white font-semibold mt-1">
                  {lessons[activeModule]?.title}
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest mb-0.5">
                    Lesson {activeModule + 1} of {course.totalModules}
                    {lessons[activeModule]?.chapter ? ` · ${lessons[activeModule].chapter}` : ''}
                  </p>
                  <h2 className="text-lg font-bold text-base-content">
                    {lessons[activeModule]?.title}
                  </h2>
                </div>
                {isDone && (
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    <HiOutlineCheckCircle className="w-5 h-5" />
                    Completed
                  </span>
                )}
              </div>

              <p className="text-sm text-base-content/60 leading-relaxed mb-6">
                In this lesson, you will explore key concepts from{' '}
                <strong className="text-base-content">{course.title}</strong>.
                Take your time to absorb the material before marking it complete.
              </p>

              {/* Mobile lesson selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
                {lessons.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveModule(i)}
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                      i < completedModules
                        ? 'bg-emerald-500 text-white'
                        : i === activeModule
                        ? 'bg-primary text-primary-content'
                        : 'border-2 border-base-300 text-base-content/40'
                    }`}
                  >
                    {i < completedModules ? '✓' : i + 1}
                  </button>
                ))}
              </div>

              {/* Navigation + complete */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                  disabled={activeModule === 0}
                  className="px-4 py-2.5 rounded-xl border border-base-300 text-base-content/70 text-sm font-medium hover:bg-base-200 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>

                {isDone ? (
                  <button
                    onClick={() => activeModule < course.totalModules - 1 && setActiveModule(activeModule + 1)}
                    disabled={activeModule >= course.totalModules - 1}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-base-200 hover:bg-base-200 text-base-content/80 font-semibold text-sm rounded-xl transition-colors disabled:opacity-40"
                  >
                    Next
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all hover:shadow-md disabled:opacity-60"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <HiOutlineCheckCircle className="w-4 h-4" />
                    )}
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
