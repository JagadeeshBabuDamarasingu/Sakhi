import { ListingsClient } from './ListingsClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getListings() {
  const res = await fetch(`${BASE}/api/seller/listings`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch listings')
  return res.json()
}

export default async function ListingsPage() {
  const listings = await getListings()
  return <ListingsClient listings={listings} />
}
