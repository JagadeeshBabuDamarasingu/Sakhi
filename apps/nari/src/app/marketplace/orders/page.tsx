import { OrdersClient } from './OrdersClient'
import { getSellerOrders } from '@/lib/marketplace-store'

export default async function OrdersPage() {
  const orders = getSellerOrders()
  return <OrdersClient orders={orders} />
}
