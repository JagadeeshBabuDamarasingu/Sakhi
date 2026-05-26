import { NextRequest, NextResponse } from 'next/server'
import { enrollInCourse } from '@/lib/elearning-store'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const progress = enrollInCourse(id)

  if (!progress) {
    return NextResponse.json(
      { error: 'Course not found or already enrolled' },
      { status: 400 }
    )
  }

  return NextResponse.json(progress, { status: 201 })
}
