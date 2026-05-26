import { MarketplaceClient } from '@/components/marketplace/MarketplaceClient'

async function getMarketplaceData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/seller/analytics`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch marketplace data')
  return res.json()
}

export default async function MarketplacePage() {
  const data = await getMarketplaceData()
  return <MarketplaceClient data={data} />
}
