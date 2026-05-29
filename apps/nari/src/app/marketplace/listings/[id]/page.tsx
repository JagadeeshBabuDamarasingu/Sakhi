import { notFound } from 'next/navigation'
import { ListingDetailClient } from './ListingDetailClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getListing(id: string) {
  const res = await fetch(`${BASE}/api/seller/listings/${id}`, { cache: 'no-store' })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch listing')
  return res.json()
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = await getListing(id)
  if (!listing) notFound()
  return <ListingDetailClient listing={listing} />
}
