import { NextResponse } from 'next/server'
import { getOrderById, updateOrderStatus } from '@/lib/marketplace-store'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrderById(id)
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { status } = await request.json()
  const order = updateOrderStatus(id, status)
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  return NextResponse.json(order)
}
