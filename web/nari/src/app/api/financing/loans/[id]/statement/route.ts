import { NextResponse } from 'next/server'
import { getLoanDocument } from '@/lib/financing-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const document = getLoanDocument(id, 'statement')
  if (!document) return NextResponse.json({ error: 'Statement not found.' }, { status: 404 })

  return new NextResponse(document.content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${document.filename}"`,
    },
  })
}
