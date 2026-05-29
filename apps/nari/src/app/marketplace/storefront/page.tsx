import { StorefrontClient } from './StorefrontClient'
import { getSellerProfile, getSellerListings } from '@/lib/marketplace-store'

export default async function StorefrontPage() {
  const sellerProfile = getSellerProfile()
  const listings = getSellerListings()
  return <StorefrontClient data={{ sellerProfile, listings }} />
}
