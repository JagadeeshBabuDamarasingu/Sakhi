import { NextResponse } from 'next/server'
import { getBadges } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getBadges())
}
