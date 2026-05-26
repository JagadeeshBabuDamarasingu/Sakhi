import { NextResponse } from 'next/server'
import { requestEarlyClosure } from '@/lib/financing-store'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const quote = requestEarlyClosure(id)
  if (!quote) return NextResponse.json({ error: 'Loan not found or already closed.' }, { status: 404 })

  return NextResponse.json(quote)
}
