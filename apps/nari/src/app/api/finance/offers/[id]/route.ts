import { NextResponse } from 'next/server'
import { getLenderOffers } from '@/lib/financing-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: applicationId } = await params
  return NextResponse.json(getLenderOffers(applicationId))
}
