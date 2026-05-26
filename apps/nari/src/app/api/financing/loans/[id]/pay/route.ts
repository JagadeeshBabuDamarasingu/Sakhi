import { NextResponse } from 'next/server'
import { payLoanEmi } from '@/lib/financing-store'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const loan = payLoanEmi(id)
  if (!loan) return NextResponse.json({ error: 'Loan not found or already closed.' }, { status: 404 })

  return NextResponse.json(loan)
}
