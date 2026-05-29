import { InsightsClient } from './InsightsClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getAnalytics() {
  const res = await fetch(`${BASE}/api/seller/analytics`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch analytics')
  return res.json()
}

export default async function InsightsPage() {
  const analytics = await getAnalytics()
  return <InsightsClient analytics={analytics} />
}
