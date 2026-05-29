import { notFound } from 'next/navigation'
import { SkillDetailClient } from './SkillDetailClient'
import { getSkillDiscoveryData } from '@/lib/skill-store'

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { skills, validationMethods } = getSkillDiscoveryData()
  const skill = skills.find((s) => s.id === id)
  if (!skill) notFound()
  return <SkillDetailClient skill={skill} validationMethods={validationMethods ?? []} />
}
