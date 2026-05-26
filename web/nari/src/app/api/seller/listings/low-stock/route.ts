import { NextResponse } from 'next/server'
import { getLowStockListings } from '@/lib/marketplace-store'

export async function GET() {
  return NextResponse.json(getLowStockListings())
}
