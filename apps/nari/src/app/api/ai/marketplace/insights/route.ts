import { NextResponse } from 'next/server'
import { generateMarketplaceInsights } from '@/lib/ai/orchestrator'

export async function POST() {
  return NextResponse.json(await generateMarketplaceInsights())
}
