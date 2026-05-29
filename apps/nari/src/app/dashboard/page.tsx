import { DashboardClient } from '@/components/dashboard/DashboardClient'
import { getDashboardData } from '@/lib/dashboard-store'

export default async function DashboardPage() {
  const data = getDashboardData()
  return <DashboardClient data={data} />
}
