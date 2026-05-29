import { NextResponse } from 'next/server'
import { startLoanApplication } from '@/lib/financing-store'
import type { LoanType } from '@/components/financing/types'

const loanTypes = new Set<LoanType>(['micro-loan', 'course-financing', 'business-expansion'])

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const type = body?.type as LoanType | undefined

  if (!type || !loanTypes.has(type)) {
    return NextResponse.json({ error: 'Valid loan type is required.' }, { status: 400 })
  }

  return NextResponse.json(startLoanApplication(type, body?.amount, body?.tenure), { status: 201 })
}
