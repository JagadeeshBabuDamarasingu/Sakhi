import { NextResponse } from 'next/server'
import { createSellerListing, getSellerListings } from '@/lib/marketplace-store'

export async function GET() {
  return NextResponse.json(getSellerListings())
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title || !body.description || !body.category || typeof body.price !== 'number') {
    return NextResponse.json(
      { error: 'title, description, category, and numeric price are required' },
      { status: 400 }
    )
  }

  return NextResponse.json(createSellerListing(body), { status: 201 })
}
