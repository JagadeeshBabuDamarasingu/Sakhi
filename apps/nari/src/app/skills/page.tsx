import { SkillDiscoveryClient } from '@/components/skill-discovery/SkillDiscoveryClient'
import { getSkillDiscoveryData } from '@/lib/skill-store'

export default async function SkillDiscoveryPage() {
  const data = getSkillDiscoveryData()
  return <SkillDiscoveryClient data={data} />
}
