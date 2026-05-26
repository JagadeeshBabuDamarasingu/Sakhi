import { NextResponse } from 'next/server'
import { startSellerLiveSession } from '@/lib/marketplace-store'

export async function POST() {
  return NextResponse.json({ liveStream: startSellerLiveSession() }, { status: 201 })
}
