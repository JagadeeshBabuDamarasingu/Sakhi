import { NextResponse } from 'next/server'
import { getListingById, updateListing, deleteListing } from '@/lib/marketplace-store'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = getListingById(id)
  if (!listing) return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  return NextResponse.json(listing)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const listing = updateListing(id, body)
  if (!listing) return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  return NextResponse.json(listing)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deleted = deleteListing(id)
  if (!deleted) return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  return NextResponse.json({ deleted: true })
}
