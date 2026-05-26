import { ELearningClient } from '@/components/elearning/ELearningClient'

async function getELearningData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/elearning`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch eLearning data')
  return res.json()
}

export default async function ELearningPage() {
  const data = await getELearningData()
  return <ELearningClient data={data} />
}
