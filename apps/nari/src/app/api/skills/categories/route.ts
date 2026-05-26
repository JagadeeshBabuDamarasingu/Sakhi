import { NextResponse } from 'next/server'
import { getSkillDiscoveryData } from '@/lib/skill-store'

export async function GET() {
  const { skillCategories } = getSkillDiscoveryData()
  return NextResponse.json(skillCategories)
}
