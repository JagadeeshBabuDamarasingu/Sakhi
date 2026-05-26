import { NextResponse } from 'next/server'
import { getSellerOrders } from '@/lib/marketplace-store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')

  return NextResponse.json(
    getSellerOrders({
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
    })
  )
}
