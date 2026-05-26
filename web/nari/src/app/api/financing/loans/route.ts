import { NextResponse } from 'next/server'
import { getFinancingLoans } from '@/lib/financing-store'

export async function GET() {
  return NextResponse.json(getFinancingLoans())
}
