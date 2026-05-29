import { NextResponse } from 'next/server'
import { getMandateInfo, updateMandateDebitDay, cancelMandate } from '@/lib/financing-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const mandate = getMandateInfo(id)
  if (!mandate) return NextResponse.json({ error: 'Loan not found.' }, { status: 404 })

  return NextResponse.json(mandate)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const debitDay = body?.debitDay

  if (!debitDay || typeof debitDay !== 'number' || debitDay < 1 || debitDay > 28) {
    return NextResponse.json({ error: 'debitDay must be 1–28.' }, { status: 400 })
  }

  const mandate = updateMandateDebitDay(id, debitDay)
  if (!mandate) return NextResponse.json({ error: 'Loan not found or mandate not active.' }, { status: 404 })

  return NextResponse.json(mandate)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const result = cancelMandate(id)
  if (!result) return NextResponse.json({ error: 'Loan not found.' }, { status: 404 })

  return NextResponse.json(result)
}
