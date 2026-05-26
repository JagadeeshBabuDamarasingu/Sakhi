import { NextResponse } from 'next/server'
import { completeOnboardingStep } from '@/lib/dashboard-store'

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const step = completeOnboardingStep(id)
  if (!step) {
    return NextResponse.json({ error: 'Step not found' }, { status: 404 })
  }
  return NextResponse.json(step)
}
