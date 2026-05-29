import { MandateClient } from './MandateClient'
import { getMandateInfo } from '@/lib/financing-store'
import { notFound } from 'next/navigation'

export default async function MandatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mandate = getMandateInfo(id)
  if (!mandate) notFound()
  return <MandateClient mandate={mandate} />
}
