import { ELearningClient } from '@/components/elearning/ELearningClient'
import { getELearningData } from '@/lib/elearning-store'

export default async function ELearningPage() {
  const data = getELearningData()
  return <ELearningClient data={data} />
}
