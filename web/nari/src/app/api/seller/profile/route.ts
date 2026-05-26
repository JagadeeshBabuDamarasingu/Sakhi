import { NextResponse } from 'next/server'
import { getSellerProfile } from '@/lib/marketplace-store'

export async function GET() {
  return NextResponse.json(getSellerProfile())
}
