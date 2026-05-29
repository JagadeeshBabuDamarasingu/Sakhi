'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2'
import type { Order, OrderStatus } from '@/components/marketplace/types'

const STATUS_STYLES: Record<OrderStatus, { badge: string; label: string }> = {
  placed: { badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Placed' },
  confirmed: { badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', label: 'Confirmed' },
  processing: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', label: 'Processing' },
  shipped: { badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', label: 'Shipped' },
  out_for_delivery: { badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Out for delivery' },
  delivered: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Delivered' },
  completed: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Completed' },
  return_requested: { badge: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', label: 'Return requested' },
  returned: { badge: 'bg-stone-100 text-base-content/50', label: 'Returned' },
  cancelled: { badge: 'bg-stone-100 text-base-content/40', label: 'Cancelled' },
}

const FILTER_GROUPS = [
  { value: 'all', label: 'All' },
  { value: 'placed', label: 'New' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
] as const

export function OrdersClient({ orders }: { orders: Order[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | OrderStatus>('all')

  const visible = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.buyerName.toLowerCase().includes(q)
      )
    }
    return true
  })

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Marketplace</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Orders</h1>
            <p className="text-sm text-base-content/60 mt-1">{orders.length} orders · ₹{totalRevenue.toLocaleString('en-IN')} revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by order # or buyer…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-base-100 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTER_GROUPS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === f.value
                    ? 'bg-rose-500 text-white'
                    : 'bg-base-100 text-base-content/50 border border-base-300 hover:border-rose-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-16 text-base-content/35">
            <HiOutlineShoppingBag className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm font-medium">No orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visible.map((order) => {
              const style = STATUS_STYLES[order.status]
              const date = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
              return (
                <button
                  key={order.id}
                  onClick={() => router.push(`/marketplace/orders/${order.id}`)}
                  className="w-full bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300 flex items-start gap-4 text-left hover:ring-rose-200 dark:hover:ring-rose-800 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-base-200 flex flex-col items-center justify-center flex-shrink-0">
                    <HiOutlineShoppingBag className="w-5 h-5 text-base-content/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-base-content">{order.orderNumber}</p>
                        <p className="text-xs text-base-content/40 mt-0.5">{order.buyerName} · {date}</p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-base-content/40">
                      <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                      <span className="font-semibold text-base-content/80">₹{order.total.toLocaleString('en-IN')}</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
