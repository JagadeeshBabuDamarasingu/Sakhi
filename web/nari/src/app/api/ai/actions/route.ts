import { NextResponse } from 'next/server'
import { getDashboardAgentActions } from '@/lib/ai/orchestrator'

export async function GET() {
  return NextResponse.json(getDashboardAgentActions())
}
