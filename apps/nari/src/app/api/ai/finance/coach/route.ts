import { NextResponse } from 'next/server'
import { runFinancingCoach } from '@/lib/ai/orchestrator'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))

  return NextResponse.json(
    await runFinancingCoach({
      loanType: body.loanType,
      amount: body.amount,
      tenure: body.tenure,
    })
  )
}
