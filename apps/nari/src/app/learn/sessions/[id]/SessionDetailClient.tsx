'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'
import type { LiveSession, Speaker } from '@/components/elearning/types'

interface SessionData extends LiveSession {
  speaker: Speaker | null
  isRegistered: boolean
}

const SESSION_TYPE_LABELS: Record<string, string> = {
  'guest-speaker': 'Guest Speaker',
  'bootcamp': 'Bootcamp',
  'workshop': 'Workshop',
}

const SESSION_TYPE_COLORS: Record<string, string> = {
  'guest-speaker': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'bootcamp': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'workshop': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

function formatDateTime(isoStr: string) {
  const d = new Date(isoStr)
  return {
    date: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' }),
    day: d.getDate(),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
  }
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function SessionDetailClient({ session }: { session: SessionData }) {
  const router = useRouter()
  const [registered, setRegistered] = useState(session.isRegistered)
  const [registering, setRegistering] = useState(false)
  const [count, setCount] = useState(session.registeredCount)

  const dt = formatDateTime(session.scheduledAt)
  const spotsLeft = session.maxCapacity - count
  const isFull = spotsLeft <= 0
  const spotsPercent = Math.min(100, (count / session.maxCapacity) * 100)

  const handleRegister = useCallback(async () => {
    setRegistering(true)
    try {
      const res = await fetch(`/api/live-sessions/${session.id}/register`, { method: 'POST' })
      if (!res.ok) return
      setRegistered(true)
      setCount((n) => n + 1)
    } finally {
      setRegistering(false)
    }
  }, [session.id])

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Learning
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-8 text-white mb-6 shadow-xl shadow-rose-200 dark:shadow-rose-950">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <HiOutlineVideoCamera className="w-3.5 h-3.5" />
                {SESSION_TYPE_LABELS[session.type] ?? session.type}
              </span>
              {session.isUpcoming && (
                <span className="text-xs font-semibold bg-emerald-500/80 px-2.5 py-1 rounded-full">
                  Upcoming
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold leading-snug mb-3">{session.title}</h1>
            <p className="text-rose-200 text-sm leading-relaxed">{session.description}</p>
          </div>
        </div>

        {/* Date/time card */}
        <div className="bg-base-100 rounded-2xl p-5 mb-5 shadow-sm ring-1 ring-base-300">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-semibold text-rose-500 uppercase">{dt.month}</span>
              <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 leading-none">{dt.day}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base-content text-sm">{dt.date}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-base-content/50">
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  {dt.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  {formatDuration(session.duration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Speaker card */}
        {session.speaker && (
          <div className="bg-base-100 rounded-2xl p-5 mb-5 shadow-sm ring-1 ring-base-300">
            <h2 className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">
              Speaker
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-200 to-amber-200 dark:from-rose-900 dark:to-amber-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-rose-700 dark:text-rose-300">
                  {session.speaker.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base-content">{session.speaker.name}</p>
                <p className="text-sm text-base-content/50">{session.speaker.title}</p>
                <p className="text-sm text-base-content/60 leading-relaxed mt-2">
                  {session.speaker.bio}
                </p>
                {session.speaker.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {session.speaker.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-base-content/50 bg-base-200 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Capacity */}
        <div className="bg-base-100 rounded-2xl p-5 mb-6 shadow-sm ring-1 ring-base-300">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-sm font-medium text-base-content/80">
              <HiOutlineUsers className="w-4 h-4" />
              {count.toLocaleString()} registered
            </span>
            <span className="text-sm text-base-content/40">
              {spotsLeft > 0 ? `${spotsLeft.toLocaleString()} spots left` : 'Full'}
            </span>
          </div>
          <div className="h-2 bg-base-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                spotsPercent > 90 ? 'bg-red-500' : spotsPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${spotsPercent}%` }}
            />
          </div>
        </div>

        {/* Register CTA */}
        {registered ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 font-semibold rounded-2xl">
              <HiOutlineCheckCircle className="w-5 h-5" />
              You&apos;re registered!
            </div>
            <p className="text-xs text-base-content/40 text-center">
              This session has been added to your learning calendar.
            </p>
            <button
              onClick={() => router.push('/learn/calendar')}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View in calendar →
            </button>
          </div>
        ) : (
          <button
            onClick={handleRegister}
            disabled={registering || isFull || !session.isUpcoming}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-sm transition-all hover:shadow-md disabled:opacity-60 text-sm"
          >
            {registering ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <HiOutlineVideoCamera className="w-5 h-5" />
            )}
            {isFull ? 'Session full' : 'Register — it&apos;s free'}
          </button>
        )}

        <p className="text-xs text-base-content/40 text-center mt-4">
          You&apos;ll receive a reminder on the day of the session.
        </p>
      </div>
    </div>
  )
}
