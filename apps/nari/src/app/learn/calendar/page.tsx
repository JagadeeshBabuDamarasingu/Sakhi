import { CalendarClient } from './CalendarClient'
import { getCalendarEvents } from '@/lib/elearning-store'

export default async function CalendarPage() {
  const events = getCalendarEvents()
  return <CalendarClient events={events} />
}
