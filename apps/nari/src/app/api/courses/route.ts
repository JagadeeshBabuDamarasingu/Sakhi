import { NextRequest, NextResponse } from 'next/server'
import { getCourses } from '@/lib/elearning-store'
import { getSkillDiscoveryData } from '@/lib/skill-store'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const relatedSkill = searchParams.get('relatedSkill') ?? undefined

  let courses = getCourses({ category, search })

  if (relatedSkill) {
    const { skills } = getSkillDiscoveryData()
    const skill = skills.find((s) => s.id === relatedSkill)
    if (skill) {
      courses = courses.filter((c) => skill.relatedCourses.includes(c.id))
    } else {
      courses = []
    }
  }

  return NextResponse.json(courses)
}
