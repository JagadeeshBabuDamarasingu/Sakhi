import { NextRequest, NextResponse } from 'next/server'
import { cancelToolCall } from '@/lib/ai/orchestrator'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    return NextResponse.json(cancelToolCall(id))
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not cancel tool call' },
      { status: 404 }
    )
  }
}
