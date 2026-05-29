import { notFound } from 'next/navigation'
import { OrderDetailClient } from './OrderDetailClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getOrder(id: string) {
  const res = await fetch(`${BASE}/api/seller/orders/${id}`, { cache: 'no-store' })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch order')
  return res.json()
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)
  if (!order) notFound()
  return <OrderDetailClient order={order} />
}
