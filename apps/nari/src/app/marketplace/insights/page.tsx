import { InsightsClient } from './InsightsClient'
import { getSellerAnalytics } from '@/lib/marketplace-store'

export default async function InsightsPage() {
  const analytics = getSellerAnalytics()
  return <InsightsClient analytics={analytics} />
}
