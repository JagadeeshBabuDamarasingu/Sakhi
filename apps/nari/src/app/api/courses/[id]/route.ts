import { NextResponse } from 'next/server'
import { getCourseById } from '@/lib/elearning-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) return NextResponse.json({ error: 'Course not found.' }, { status: 404 })

  return NextResponse.json(course)
}
