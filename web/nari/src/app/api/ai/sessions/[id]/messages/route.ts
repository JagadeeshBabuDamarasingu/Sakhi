import { NextRequest, NextResponse } from 'next/server'
import { sendAiMessage } from '@/lib/ai/orchestrator'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body?.content || typeof body.content !== 'string') {
    return NextResponse.json({ error: 'content is required' }, { status: 400 })
  }

  try {
    const response = await sendAiMessage(id, body.content, {
      requestedTool: body.requestedTool,
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not send AI message' },
      { status: 400 }
    )
  }
}
