import { NextResponse } from 'next/server'
import { getCalendarEvents } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getCalendarEvents())
}
