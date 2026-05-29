import { notFound } from 'next/navigation'
import { SkillDetailClient } from './SkillDetailClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getSkill(id: string) {
  const res = await fetch(`${BASE}/api/skills/${id}`, { cache: 'no-store' })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch skill')
  return res.json()
}

async function getSkillData() {
  const res = await fetch(`${BASE}/api/skills`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [skill, allData] = await Promise.all([getSkill(id), getSkillData()])
  if (!skill) notFound()
  return <SkillDetailClient skill={skill} validationMethods={allData?.validationMethods ?? []} />
}
