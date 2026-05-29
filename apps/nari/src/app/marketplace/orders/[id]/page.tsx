import { notFound } from 'next/navigation'
import { OrderDetailClient } from './OrderDetailClient'
import { getOrderById } from '@/lib/marketplace-store'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrderById(id)
  if (!order) notFound()
  return <OrderDetailClient order={order} />
}
