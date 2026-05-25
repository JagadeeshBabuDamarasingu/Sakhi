import type { LiveSession, Speaker } from './types'

interface LiveEventBannerProps {
  session: LiveSession
  speaker?: Speaker
  onRegister?: () => void
  onView?: () => void
}

export function LiveEventBanner({
  session,
  speaker,
  onRegister,
  onView,
}: LiveEventBannerProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const spotsLeft = session.maxCapacity - session.registeredCount
  const isAlmostFull = spotsLeft < 100

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 p-[1px] shadow-lg transition-all hover:shadow-xl"
      onClick={onView}
    >
      <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 p-5 sm:p-6">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl" />

        <div className="absolute right-4 top-4 grid grid-cols-3 gap-1 opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {session.type === 'bootcamp' ? 'Bootcamp' : 'Live Session'}
              </span>
              <span className="text-xs font-medium text-white/80">
                {formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)}
              </span>
            </div>

            <h3 className="text-lg font-bold leading-tight text-white sm:text-xl">
              {session.title}
            </h3>

            {speaker && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">{speaker.name}</p>
                  <p className="text-sm text-white/80">{speaker.title}</p>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-rose-500 bg-white/20 text-[10px] font-medium text-white backdrop-blur-sm"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/90">
                <span className="font-semibold">{session.registeredCount.toLocaleString()}</span> registered
                {isAlmostFull && (
                  <span className="ml-1 text-amber-200">&bull; Only {spotsLeft} spots left!</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onRegister}
              className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 hover:shadow-xl active:scale-[0.98] sm:w-auto"
            >
              Register Free
              <svg
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
