import { NextResponse } from 'next/server'
import { getSkillDiscoveryData } from '@/lib/skill-store'

export async function GET() {
  return NextResponse.json(getSkillDiscoveryData())
}
