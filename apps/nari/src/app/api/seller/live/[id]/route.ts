import { NextResponse } from 'next/server'
import { getLiveStreamById, endLiveStream } from '@/lib/marketplace-store'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stream = getLiveStreamById(id)
  if (!stream) return NextResponse.json({ error: 'Stream not found.' }, { status: 404 })
  return NextResponse.json(stream)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stream = endLiveStream(id)
  if (!stream) return NextResponse.json({ error: 'Stream not found.' }, { status: 404 })
  return NextResponse.json(stream)
}
