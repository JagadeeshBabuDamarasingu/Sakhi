import { SessionDetailClient } from './SessionDetailClient'
import { getSessionById, getSpeakerById, isRegisteredForSession } from '@/lib/elearning-store'
import { notFound } from 'next/navigation'

export default async function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = getSessionById(id)
  if (!session) notFound()
  const speaker = session.speakerId ? getSpeakerById(session.speakerId) : null
  const isRegistered = isRegisteredForSession(id)
  return <SessionDetailClient session={{ ...session, speaker, isRegistered }} />
}
