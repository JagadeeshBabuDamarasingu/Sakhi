import { NextResponse } from 'next/server'
import { createAiSession } from '@/lib/ai/orchestrator'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))

  return NextResponse.json(
    createAiSession({
      purpose: body.purpose,
      language: body.language,
    }),
    { status: 201 }
  )
}
