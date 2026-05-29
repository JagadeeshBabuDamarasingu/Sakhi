import { notFound } from 'next/navigation'
import { LiveSessionClient } from './LiveSessionClient'
import { getLiveStreamById } from '@/lib/marketplace-store'

export default async function LiveSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stream = getLiveStreamById(id)
  if (!stream) notFound()
  return <LiveSessionClient stream={stream} />
}
