'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineCalendar,
} from 'react-icons/hi2'
import type { CalendarEvent } from '@/components/elearning/types'

const EVENT_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  'live-session': { dot: 'bg-rose-500', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', label: 'Live' },
  'bootcamp': { dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', label: 'Bootcamp' },
  'deadline': { dot: 'bg-red-500', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Due' },
  'course-reminder': { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Reminder' },
  'mandatory-reminder': { dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Required' },
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function formatTime(isoStr: string) {
  return new Date(isoStr).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatFullDate(isoStr: string) {
  return new Date(isoStr).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function CalendarClient({ events }: { events: CalendarEvent[] }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDate(null)
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDate(null)
  }

  function getEventsForDate(date: Date) {
    return events.filter((e) => isSameDay(new Date(e.scheduledAt), date))
  }

  const upcomingEvents = events
    .filter((e) => !e.isCompleted && new Date(e.scheduledAt) >= today)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : null

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/elearning"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Learning
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">e-Learning</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Learning Calendar</h1>
            <p className="text-sm text-base-content/60 mt-1">Your scheduled sessions and upcoming events</p>
          </div>
          <HiOutlineCalendar className="w-7 h-7 text-primary flex-shrink-0" />
        </div>

        {/* Calendar card */}
        <div className="bg-base-100 rounded-2xl shadow-sm ring-1 ring-base-300 overflow-hidden mb-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content/70 hover:bg-base-200 transition-colors"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-base-content">
              {MONTHS[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content/70 hover:bg-base-200 transition-colors"
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-2 py-2 border-b border-stone-50">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[11px] font-semibold text-base-content/40 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 px-2 pb-3">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const date = new Date(year, month, day)
              const dayEvents = getEventsForDate(date)
              const isToday = isSameDay(date, today)
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
              const isPast = date < today && !isToday

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : date)}
                  className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-xl mx-0.5 my-0.5 transition-colors ${
                    isSelected
                      ? 'bg-rose-500 text-white'
                      : isToday
                      ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                      : isPast && dayEvents.length === 0
                      ? 'text-base-content/25'
                      : 'hover:bg-base-200 text-base-content/80'
                  }`}
                >
                  <span className={`text-xs font-semibold leading-none ${isToday && !isSelected ? 'font-bold' : ''}`}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {dayEvents.slice(0, 3).map((ev, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isSelected ? 'bg-white' : (EVENT_STYLES[ev.type]?.dot ?? 'bg-stone-400')
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(EVENT_STYLES).map(([type, style]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${style.dot}`} />
              <span className="text-xs text-base-content/40">{style.label}</span>
            </div>
          ))}
        </div>

        {/* Selected day events */}
        {selectedDate && selectedEvents !== null && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">
              {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h2>
            {selectedEvents.length === 0 ? (
              <div className="text-center py-8 text-base-content/35">
                <HiOutlineCalendar className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No events on this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map((event) => {
                  const style = EVENT_STYLES[event.type] ?? EVENT_STYLES['course-reminder']
                  return (
                    <div
                      key={event.id}
                      className="bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 text-center">
                        <span className="text-xs text-base-content/40 block">
                          {formatTime(event.scheduledAt)}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${style.dot} block mx-auto mt-1.5`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-base-content leading-snug">
                            {event.title}
                          </p>
                          <span className={`flex-shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                        {event.sessionId && (
                          <Link
                            href={`/elearning/sessions/${event.sessionId}`}
                            className="text-xs text-primary hover:text-primary/80 mt-1 inline-block transition-colors"
                          >
                            View session →
                          </Link>
                        )}
                        {event.courseId && !event.sessionId && (
                          <Link
                            href={`/elearning/courses/${event.courseId}`}
                            className="text-xs text-primary hover:text-primary/80 mt-1 inline-block transition-colors"
                          >
                            Go to course →
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Upcoming events list */}
        {!selectedDate && (
          <section>
            <h2 className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">
              Upcoming
            </h2>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-10 text-base-content/35">
                <HiOutlineCalendar className="w-10 h-10 mx-auto mb-3" />
                <p className="text-sm font-medium">No upcoming events</p>
                <p className="text-xs mt-1">Enroll in courses or register for sessions to see them here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const style = EVENT_STYLES[event.type] ?? EVENT_STYLES['course-reminder']
                  const isThisMonth = new Date(event.scheduledAt).getMonth() === month && new Date(event.scheduledAt).getFullYear() === year
                  return (
                    <div
                      key={event.id}
                      className="bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300 flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-base-200 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-medium text-base-content/40 uppercase">
                          {new Date(event.scheduledAt).toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="text-lg font-bold text-base-content/80 leading-none">
                          {new Date(event.scheduledAt).getDate()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <p className="text-sm font-medium text-base-content leading-snug">
                            {event.title}
                          </p>
                          <span className={`flex-shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                        <p className="text-xs text-base-content/40">
                          {formatFullDate(event.scheduledAt)} · {formatTime(event.scheduledAt)}
                        </p>
                        <div className="mt-1.5 flex gap-3">
                          {event.sessionId && (
                            <Link href={`/elearning/sessions/${event.sessionId}`} className="text-xs text-primary hover:text-primary/80 transition-colors">
                              View session →
                            </Link>
                          )}
                          {event.courseId && !event.sessionId && (
                            <Link href={`/elearning/courses/${event.courseId}`} className="text-xs text-primary hover:text-primary/80 transition-colors">
                              Go to course →
                            </Link>
                          )}
                          {isThisMonth && (
                            <button
                              onClick={() => setSelectedDate(new Date(event.scheduledAt))}
                              className="text-xs text-base-content/40 hover:text-base-content/70 transition-colors"
                            >
                              See in calendar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
