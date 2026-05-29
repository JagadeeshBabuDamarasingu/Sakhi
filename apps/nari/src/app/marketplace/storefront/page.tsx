import { StorefrontClient } from './StorefrontClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getStorefrontData() {
  const [profileRes, listingsRes] = await Promise.all([
    fetch(`${BASE}/api/seller/profile`, { cache: 'no-store' }),
    fetch(`${BASE}/api/seller/listings`, { cache: 'no-store' }),
  ])
  const sellerProfile = profileRes.ok ? await profileRes.json() : null
  const listings = listingsRes.ok ? await listingsRes.json() : []
  return { sellerProfile, listings }
}

export default async function StorefrontPage() {
  const data = await getStorefrontData()
  return <StorefrontClient data={data} />
}
