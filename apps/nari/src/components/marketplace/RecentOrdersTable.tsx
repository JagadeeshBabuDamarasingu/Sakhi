import type { Order, OrderStatus } from './types'

interface RecentOrdersTableProps {
  orders: Order[]
  onViewOrder?: (orderId: string) => void
  onViewAll?: () => void
}

const statusStyles: Record<
  OrderStatus,
  { bg: string; text: string; dot: string }
> = {
  placed: {
    bg: 'bg-info/10',
    text: 'text-info',
    dot: 'bg-info',
  },
  confirmed: {
    bg: 'bg-info/15',
    text: 'text-info',
    dot: 'bg-info',
  },
  processing: {
    bg: 'bg-secondary/20',
    text: 'text-secondary',
    dot: 'bg-secondary animate-pulse',
  },
  shipped: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    dot: 'bg-purple-500',
  },
  out_for_delivery: {
    bg: 'bg-info/10',
    text: 'text-info',
    dot: 'bg-info animate-pulse',
  },
  delivered: {
    bg: 'bg-success/15',
    text: 'text-success',
    dot: 'bg-success',
  },
  completed: {
    bg: 'bg-success/15',
    text: 'text-success',
    dot: 'bg-success',
  },
  return_requested: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    dot: 'bg-warning',
  },
  returned: {
    bg: 'bg-base-200',
    text: 'text-base-content/70',
    dot: 'bg-base-content/50',
  },
  cancelled: {
    bg: 'bg-error/10',
    text: 'text-error',
    dot: 'bg-error',
  },
}

const statusLabels: Record<OrderStatus, string> = {
  placed: 'Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  completed: 'Completed',
  return_requested: 'Return Requested',
  returned: 'Returned',
  cancelled: 'Cancelled',
}

export function RecentOrdersTable({ orders, onViewOrder, onViewAll }: RecentOrdersTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return formatDate(dateStr)
  }

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-base-300">
        <div>
          <h3 className="text-lg font-semibold text-base-content">Recent Orders</h3>
          <p className="text-sm text-base-content/60 mt-0.5">
            {orders.length} order{orders.length !== 1 ? 's' : ''} to manage
          </p>
        </div>
        <button
          onClick={onViewAll}
          aria-label="View all seller orders"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          View all orders
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Cards / Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Order
              </th>
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Items
              </th>
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Total
              </th>
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-base-content/60 uppercase tracking-wider px-5 py-3">
                Date
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {orders.map((order) => {
              const style = statusStyles[order.status]
              return (
                <tr
                  key={order.id}
                  className="hover:bg-base-200 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono font-medium text-base-content">
                      {order.orderNumber.split('-').pop()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-base-content">
                        {order.buyerName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {order.shippingAddress?.city || 'Digital'}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-base-content/70">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-base-content">
                      {formatCurrency(order.total)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${style.bg} ${style.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-base-content/60">
                      {getTimeAgo(order.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onViewOrder?.(order.id)}
                      aria-label={`View order ${order.orderNumber}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary/80"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden divide-y divide-base-300">
        {orders.map((order) => {
          const style = statusStyles[order.status]
          return (
            <button
              key={order.id}
              onClick={() => onViewOrder?.(order.id)}
              className="w-full p-4 text-left hover:bg-base-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-sm font-semibold text-base-content">
                    {order.buyerName}
                  </p>
                  <p className="text-xs text-base-content/60 mt-0.5">
                    #{order.orderNumber.split('-').pop()} • {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className="text-sm font-bold text-base-content">
                  {formatCurrency(order.total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${style.bg} ${style.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {statusLabels[order.status]}
                </span>
                <span className="text-xs text-base-content/60">
                  {getTimeAgo(order.createdAt)}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {orders.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-sm font-medium text-base-content">
            No orders yet
          </p>
          <p className="mt-1 text-sm text-base-content/60">
            Your first order will appear here
          </p>
        </div>
      )}
    </div>
  )
}
