import { NextResponse } from 'next/server'
import { getLiveSessions } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getLiveSessions())
}
