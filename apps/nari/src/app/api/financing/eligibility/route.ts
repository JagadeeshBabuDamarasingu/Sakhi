import { NextResponse } from 'next/server'
import { checkFinancingEligibility } from '@/lib/financing-store'

export async function GET() {
  return NextResponse.json(checkFinancingEligibility())
}
