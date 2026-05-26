import { NextResponse } from 'next/server'
import { selectLenderOffer } from '@/lib/financing-store'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const selection = selectLenderOffer(id)
  if (!selection) return NextResponse.json({ error: 'Offer not found.' }, { status: 404 })

  return NextResponse.json(selection)
}
