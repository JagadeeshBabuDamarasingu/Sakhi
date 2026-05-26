import { NextResponse } from 'next/server'
import { draftListing } from '@/lib/ai/orchestrator'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.productName || typeof body.productName !== 'string') {
    return NextResponse.json({ error: 'productName is required' }, { status: 400 })
  }

  return NextResponse.json(
    await draftListing({
      productName: body.productName,
      materials: Array.isArray(body.materials) ? body.materials : undefined,
      category: body.category,
      audience: body.audience,
    })
  )
}
