import { notFound } from 'next/navigation'
import { LiveSessionClient } from './LiveSessionClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getStream(id: string) {
  const res = await fetch(`${BASE}/api/seller/live/${id}`, { cache: 'no-store' })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch stream')
  return res.json()
}

export default async function LiveSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stream = await getStream(id)
  if (!stream) notFound()
  return <LiveSessionClient stream={stream} />
}
