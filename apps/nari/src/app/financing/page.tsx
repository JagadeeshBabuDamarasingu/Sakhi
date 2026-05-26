import { FinancingClient } from '@/components/financing/FinancingClient'

async function getFinancingData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/financing/profile`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch financing data')
  return res.json()
}

export default async function FinancingPage() {
  const data = await getFinancingData()
  return <FinancingClient data={data} />
}
