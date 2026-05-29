import { notFound } from 'next/navigation'
import { ListingDetailClient } from './ListingDetailClient'
import { getListingById } from '@/lib/marketplace-store'

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = getListingById(id)
  if (!listing) notFound()
  return <ListingDetailClient listing={listing} />
}
