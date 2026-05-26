import { NextResponse } from 'next/server'
import { runSkillDiscovery } from '@/lib/ai/orchestrator'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.message || typeof body.message !== 'string') {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  return NextResponse.json(await runSkillDiscovery(body.message))
}
