import type { Course, UserProgress } from './types'

interface CourseCardProps {
  course: Course
  progress?: UserProgress
  onView?: () => void
  onContinue?: () => void
  onEnroll?: () => void
}

export function CourseCard({
  course,
  progress,
  onView,
  onContinue,
  onEnroll,
}: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const formatIcon = (format: Course['format']) => {
    switch (format) {
      case 'video':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'interactive':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        )
      case 'mixed':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
    }
  }

  const isEnrolled = !!progress
  const isInProgress = progress?.status === 'in-progress'
  const isCompleted = progress?.status === 'completed'

  return (
    <div
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-all hover:shadow-lg hover:ring-rose-200 dark:bg-stone-900 dark:ring-stone-800 dark:hover:ring-rose-700"
      onClick={onView}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-rose-100 to-amber-50 dark:from-rose-900/30 dark:to-amber-900/20">
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`grid-${course.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" className="text-rose-300 dark:text-rose-700" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#grid-${course.id})`} />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-rose-600 shadow-lg backdrop-blur-sm dark:bg-stone-800/80 dark:text-rose-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.isMandatory && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Required
            </span>
          )}
          {course.isTrending && !course.isMandatory && (
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Trending
            </span>
          )}
          {isCompleted && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Done
            </span>
          )}
        </div>

        {/* Progress bar overlay */}
        {isInProgress && progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-stone-200/50 backdrop-blur-sm dark:bg-stone-700/50">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all"
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-stone-900 line-clamp-2 group-hover:text-rose-700 dark:text-white dark:group-hover:text-rose-400">
            {course.title}
          </h3>
        </div>

        <p className="mt-2 text-sm text-stone-600 line-clamp-2 dark:text-stone-400">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(course.duration)}
          </span>
          <span className="flex items-center gap-1">
            {formatIcon(course.format)}
            {course.format === 'video' ? 'Video' : course.format === 'interactive' ? 'Interactive' : 'Mixed'}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {course.rating}
          </span>
        </div>

        {/* Progress text */}
        {isInProgress && progress && (
          <p className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400">
            {progress.percentComplete}% complete &bull; {progress.completedModules}/{course.totalModules} modules
          </p>
        )}

        {/* CTA */}
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          {isInProgress ? (
            <button
              onClick={onContinue}
              className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-rose-600 hover:to-rose-700 hover:shadow-md active:scale-[0.98]"
            >
              Continue Learning
            </button>
          ) : isCompleted ? (
            <button
              onClick={onView}
              className="w-full rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            >
              Review Course
            </button>
          ) : isEnrolled ? (
            <button
              onClick={onContinue}
              className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-rose-600 hover:to-rose-700 hover:shadow-md active:scale-[0.98]"
            >
              Start Learning
            </button>
          ) : (
            <button
              onClick={onEnroll}
              className="w-full rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:bg-rose-50 hover:text-rose-700 dark:bg-stone-800 dark:text-white dark:hover:bg-rose-900/30 dark:hover:text-rose-400"
            >
              Enroll Free
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
