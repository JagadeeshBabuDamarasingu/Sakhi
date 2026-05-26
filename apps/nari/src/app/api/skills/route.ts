import { NextResponse } from 'next/server'
import { getSkillDiscoveryData, addSkill } from '@/lib/skill-store'

export async function GET() {
  return NextResponse.json(getSkillDiscoveryData())
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.skillName || !body?.categoryId) {
    return NextResponse.json({ error: 'skillName and categoryId are required' }, { status: 400 })
  }
  const skill = addSkill(body.skillName, body.categoryId)
  return NextResponse.json(skill, { status: 201 })
}
