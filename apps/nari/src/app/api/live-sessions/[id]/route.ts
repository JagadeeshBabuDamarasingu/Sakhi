import { NextResponse } from 'next/server'
import { getSessionById, getSpeakerById, isRegisteredForSession } from '@/lib/elearning-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = getSessionById(id)
  if (!session) return NextResponse.json({ error: 'Session not found.' }, { status: 404 })

  const speaker = session.speakerId ? getSpeakerById(session.speakerId) : null
  const isRegistered = isRegisteredForSession(id)

  return NextResponse.json({ ...session, speaker, isRegistered })
}
