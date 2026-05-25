import { NextRequest, NextResponse } from 'next/server'
import { createLearningGoal } from '@/lib/elearning-store'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, description, isActive } = body

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  const goal = createLearningGoal({
    title,
    description: description ?? '',
    isActive: isActive ?? true,
  })

  return NextResponse.json(goal, { status: 201 })
}
