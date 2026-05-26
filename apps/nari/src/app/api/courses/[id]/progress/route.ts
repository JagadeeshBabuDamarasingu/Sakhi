import { NextRequest, NextResponse } from 'next/server'
import { updateCourseProgress } from '@/lib/elearning-store'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const { completedModules } = body

  if (typeof completedModules !== 'number') {
    return NextResponse.json({ error: 'completedModules required' }, { status: 400 })
  }

  const progress = updateCourseProgress(id, completedModules)
  if (!progress) {
    return NextResponse.json({ error: 'Course or progress not found' }, { status: 404 })
  }

  return NextResponse.json(progress)
}
