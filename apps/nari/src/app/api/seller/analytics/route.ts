import { NextResponse } from 'next/server'
import { getMarketplaceDashboardData, getSellerAnalytics } from '@/lib/marketplace-store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('summaryOnly') === 'true') {
    return NextResponse.json(getSellerAnalytics())
  }

  return NextResponse.json(getMarketplaceDashboardData())
}
