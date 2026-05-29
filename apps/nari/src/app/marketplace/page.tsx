import { MarketplaceClient } from '@/components/marketplace/MarketplaceClient'
import { getMarketplaceDashboardData } from '@/lib/marketplace-store'

export default async function MarketplacePage() {
  const data = getMarketplaceDashboardData()
  return <MarketplaceClient data={data} />
}
