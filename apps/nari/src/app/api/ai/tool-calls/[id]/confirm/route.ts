import { NextRequest, NextResponse } from 'next/server'
import { confirmToolCall } from '@/lib/ai/orchestrator'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    return NextResponse.json(confirmToolCall(id))
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not confirm tool call' },
      { status: 404 }
    )
  }
}
