import { CalendarClient } from './CalendarClient'
import type { CalendarEvent } from '@/components/elearning/types'

async function getCalendarData() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const res = await fetch(`${base}/api/user/calendar`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load calendar')
  return res.json() as Promise<CalendarEvent[]>
}

export default async function CalendarPage() {
  const events = await getCalendarData()
  return <CalendarClient events={events} />
}
