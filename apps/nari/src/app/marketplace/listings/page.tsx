import { ListingsClient } from './ListingsClient'
import { getSellerListings } from '@/lib/marketplace-store'

export default async function ListingsPage() {
  const listings = getSellerListings()
  return <ListingsClient listings={listings} />
}
