import { NextResponse } from 'next/server'
import { getUserStats } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getUserStats())
}
