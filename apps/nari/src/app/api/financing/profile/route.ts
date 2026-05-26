import { NextResponse } from 'next/server'
import { acceptCreditLadderOffer, getFinancingDashboardData } from '@/lib/financing-store'

export async function GET() {
  return NextResponse.json(getFinancingDashboardData())
}

export async function POST() {
  return NextResponse.json(acceptCreditLadderOffer())
}
