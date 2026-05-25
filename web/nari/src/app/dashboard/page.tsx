import { DashboardClient } from '@/components/dashboard/DashboardClient'
import type { DashboardData } from '@/components/dashboard/types'

async function getDashboardData(): Promise<DashboardData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/dashboard`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch dashboard data')
  return res.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  return <DashboardClient data={data} />
}
