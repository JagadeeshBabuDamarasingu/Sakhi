import { SkillDiscoveryClient } from '@/components/skill-discovery/SkillDiscoveryClient'

async function getSkillData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/skills`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch skill data')
  return res.json()
}

export default async function SkillDiscoveryPage() {
  const data = await getSkillData()
  return <SkillDiscoveryClient data={data} />
}
