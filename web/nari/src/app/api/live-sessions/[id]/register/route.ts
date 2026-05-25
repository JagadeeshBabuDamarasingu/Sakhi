import { NextRequest, NextResponse } from 'next/server'
import { registerForSession } from '@/lib/elearning-store'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const result = registerForSession(id)

  if (!result.registered) {
    return NextResponse.json(
      { error: 'Session not found, not upcoming, or at capacity' },
      { status: 400 }
    )
  }

  return NextResponse.json({ registered: true, session: result.session }, { status: 201 })
}
