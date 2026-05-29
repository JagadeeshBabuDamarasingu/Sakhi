import { OrdersClient } from './OrdersClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function getOrders() {
  const res = await fetch(`${BASE}/api/seller/orders`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

export default async function OrdersPage() {
  const orders = await getOrders()
  return <OrdersClient orders={orders} />
}
