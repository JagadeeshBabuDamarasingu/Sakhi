import { NextResponse } from 'next/server'
import { startValidation } from '@/lib/skill-store'

const VALID_TYPES = ['ai-assessment', 'document', 'video'] as const
type ValidationType = (typeof VALID_TYPES)[number]

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body?.type || !VALID_TYPES.includes(body.type as ValidationType)) {
    return NextResponse.json(
      { error: `type must be one of: ${VALID_TYPES.join(', ')}` },
      { status: 400 }
    )
  }

  const updated = startValidation(id, body.type as ValidationType)
  if (!updated) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  return NextResponse.json(updated)
}
