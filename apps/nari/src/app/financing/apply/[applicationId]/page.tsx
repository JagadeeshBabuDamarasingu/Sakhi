import { OfferComparisonClient } from './OfferComparisonClient'
import type { LenderOffer } from '@/components/financing/types'

async function getOffers(applicationId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/financing/offers/${applicationId}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to load offers')
  return res.json() as Promise<LenderOffer[]>
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ applicationId: string }>
}) {
  const { applicationId } = await params
  const offers = await getOffers(applicationId)
  return <OfferComparisonClient applicationId={applicationId} offers={offers} />
}
