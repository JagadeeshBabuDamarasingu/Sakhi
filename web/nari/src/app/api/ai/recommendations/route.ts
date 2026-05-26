import { NextResponse } from 'next/server'
import { getAiRecommendations } from '@/lib/ai/orchestrator'

export async function GET() {
  return NextResponse.json(getAiRecommendations())
}
