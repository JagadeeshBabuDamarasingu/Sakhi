import { OfferComparisonClient } from './OfferComparisonClient'
import { getLenderOffers } from '@/lib/financing-store'
import { notFound } from 'next/navigation'

export default async function ApplyPage({ params }: { params: Promise<{ applicationId: string }> }) {
  const { applicationId } = await params
  const offers = getLenderOffers(applicationId)
  if (!offers) notFound()
  return <OfferComparisonClient applicationId={applicationId} offers={offers} />
}
