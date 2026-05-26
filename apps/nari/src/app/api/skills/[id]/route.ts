import { NextResponse } from 'next/server'
import { getSkillDiscoveryData, removeSkill, updateSkill } from '@/lib/skill-store'
import type { ProficiencyLevel } from '@/components/skill-discovery/types'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { skills } = getSkillDiscoveryData()
  const skill = skills.find((s) => s.id === id)
  if (!skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  return NextResponse.json(skill)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const allowed: Record<string, unknown> = {}
  if (body.proficiencyLevel) allowed.proficiencyLevel = body.proficiencyLevel as ProficiencyLevel
  if (typeof body.yearsOfExperience === 'number') allowed.yearsOfExperience = body.yearsOfExperience
  if (typeof body.description === 'string') allowed.description = body.description

  const updated = updateSkill(id, allowed)
  if (!updated) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  removeSkill(id)
  return new NextResponse(null, { status: 204 })
}
