import { FinancingClient } from '@/components/financing/FinancingClient'
import { getFinancingDashboardData } from '@/lib/financing-store'

export default async function FinancingPage() {
  const data = getFinancingDashboardData()
  return <FinancingClient data={data} />
}
