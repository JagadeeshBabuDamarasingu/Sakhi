import { NextRequest, NextResponse } from 'next/server'
import { getAiSession } from '@/lib/ai/orchestrator'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = getAiSession(id)

  if (!session) {
    return NextResponse.json({ error: 'AI session not found' }, { status: 404 })
  }

  return NextResponse.json(session)
}
