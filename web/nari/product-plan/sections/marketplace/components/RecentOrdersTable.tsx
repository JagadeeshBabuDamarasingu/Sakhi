import type { Order, OrderStatus } from '../types'

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
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  confirmed: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-700 dark:text-indigo-400',
    dot: 'bg-indigo-500',
  },
  processing: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500 animate-pulse',
  },
  shipped: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-400',
    dot: 'bg-purple-500',
  },
  out_for_delivery: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    text: 'text-cyan-700 dark:text-cyan-400',
    dot: 'bg-cyan-500 animate-pulse',
  },
  delivered: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  completed: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  return_requested: {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    text: 'text-orange-700 dark:text-orange-400',
    dot: 'bg-orange-500',
  },
  returned: {
    bg: 'bg-stone-50 dark:bg-stone-800/40',
    text: 'text-stone-700 dark:text-stone-400',
    dot: 'bg-stone-500',
  },
  cancelled: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
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
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Recent Orders</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {orders.length} order{orders.length !== 1 ? 's' : ''} to manage
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors flex items-center gap-1"
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
            <tr className="border-b border-stone-100 dark:border-stone-800">
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Order
              </th>
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Items
              </th>
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Total
              </th>
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                Date
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {orders.map((order) => {
              const style = statusStyles[order.status]
              return (
                <tr
                  key={order.id}
                  className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono font-medium text-stone-900 dark:text-stone-100">
                      {order.orderNumber.split('-').pop()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {order.buyerName}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {order.shippingAddress?.city || 'Digital'}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600 dark:text-stone-400">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
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
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {getTimeAgo(order.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onViewOrder?.(order.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
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
      <div className="sm:hidden divide-y divide-stone-100 dark:divide-stone-800">
        {orders.map((order) => {
          const style = statusStyles[order.status]
          return (
            <button
              key={order.id}
              onClick={() => onViewOrder?.(order.id)}
              className="w-full p-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {order.buyerName}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    #{order.orderNumber.split('-').pop()} • {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
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
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {getTimeAgo(order.createdAt)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
