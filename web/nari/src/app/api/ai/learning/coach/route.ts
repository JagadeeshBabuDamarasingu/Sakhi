import { NextResponse } from 'next/server'
import { runLearningCoach } from '@/lib/ai/orchestrator'

export async function POST() {
  return NextResponse.json(await runLearningCoach())
}
