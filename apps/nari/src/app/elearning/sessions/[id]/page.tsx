import { SessionDetailClient } from './SessionDetailClient'
import type { LiveSession, Speaker } from '@/components/elearning/types'

interface SessionData extends LiveSession {
  speaker: Speaker | null
  isRegistered: boolean
}

async function getSessionData(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const res = await fetch(`${base}/api/live-sessions/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Session not found')
  return res.json() as Promise<SessionData>
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSessionData(id)
  return <SessionDetailClient session={session} />
}
