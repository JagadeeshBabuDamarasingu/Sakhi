import { NextResponse } from 'next/server'
import { markAnnouncementRead, dismissAnnouncement } from '@/lib/dashboard-store'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  if (body?.action === 'read') {
    const ann = markAnnouncementRead(id)
    if (!ann) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    return NextResponse.json(ann)
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ok = dismissAnnouncement(id)
  if (!ok) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
