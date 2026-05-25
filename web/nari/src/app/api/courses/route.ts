import { NextRequest, NextResponse } from 'next/server'
import { getCourses } from '@/lib/elearning-store'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? undefined
  const search = searchParams.get('search') ?? undefined
  return NextResponse.json(getCourses({ category, search }))
}
