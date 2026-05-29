'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineCheckCircle,
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

const NEXT_STATUSES: Partial<Record<OrderStatus, OrderStatus[]>> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery'],
  out_for_delivery: ['delivered'],
  delivered: ['completed'],
  return_requested: ['returned', 'delivered'],
}

export function OrderDetailClient({ order: initial }: { order: Order }) {
  const [order, setOrder] = useState(initial)
  const [updating, setUpdating] = useState(false)

  const handleStatusUpdate = useCallback(async (status: OrderStatus) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/seller/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setOrder(updated)
    } finally {
      setUpdating(false)
    }
  }, [order.id])

  const style = STATUS_STYLES[order.status]
  const nextStatuses = NEXT_STATUSES[order.status] ?? []
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/marketplace/orders"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-6 text-white mb-5 shadow-xl">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>{style.label}</span>
              <span className="text-xs text-base-content/40">{order.paymentMethod} · {order.paymentStatus}</span>
            </div>
            <h1 className="text-lg font-bold mb-1">{order.orderNumber}</h1>
            <p className="text-base-content/40 text-xs">{date}</p>
          </div>
        </div>

        {/* Status update */}
        {nextStatuses.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Update status</p>
            <div className="flex flex-wrap gap-2">
              {nextStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusUpdate(s)}
                  disabled={updating}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white transition-colors disabled:opacity-60"
                >
                  Mark as {STATUS_STYLES[s].label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Items</p>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-base-200 flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiOutlineShoppingBag className="w-5 h-5 text-base-content/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-base-content truncate">{item.title}</p>
                  {item.variant && <p className="text-xs text-base-content/40">{item.variant}</p>}
                  <p className="text-xs text-base-content/50 mt-0.5">
                    {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-sm font-semibold text-base-content/80 flex-shrink-0">
                  ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
            <div className="flex justify-between text-xs text-base-content/50">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.shipping > 0 && (
              <div className="flex justify-between text-xs text-base-content/50">
                <span>Shipping</span>
                <span>₹{order.shipping.toLocaleString('en-IN')}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                <span>−₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-base-content pt-1">
              <span>Total</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Buyer info */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Buyer</p>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center flex-shrink-0">
              <HiOutlineUser className="w-5 h-5 text-base-content/40" />
            </div>
            <div>
              <p className="text-sm font-semibold text-base-content">{order.buyerName}</p>
              <p className="text-xs text-base-content/40">{order.buyerEmail}</p>
              <p className="text-xs text-base-content/40">{order.buyerPhone}</p>
            </div>
          </div>
          {order.shippingAddress && (
            <div className="mt-4 flex items-start gap-3">
              <HiOutlineMapPin className="w-4 h-4 text-base-content/40 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-base-content/50 leading-relaxed">
                <p className="font-medium text-base-content/80">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tracking */}
        {order.tracking && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineTruck className="w-4 h-4 text-base-content/40" />
              <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest">Tracking</p>
            </div>
            <p className="text-sm font-medium text-base-content">{order.tracking.carrier} · {order.tracking.trackingNumber}</p>
            <p className="text-xs text-base-content/40 mt-1">{order.tracking.currentStatus}</p>
            <p className="text-xs text-base-content/40">ETA: {order.tracking.estimatedDelivery}</p>
          </div>
        )}

        {/* Timeline */}
        {order.timeline.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Timeline</p>
            <div className="space-y-3">
              {[...order.timeline].reverse().map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiOutlineCheckCircle className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-base-content/80">
                      {STATUS_STYLES[event.status as OrderStatus]?.label ?? event.status}
                    </p>
                    <p className="text-[10px] text-base-content/40">
                      {new Date(event.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}
                    </p>
                    {event.note && <p className="text-xs text-base-content/50 mt-0.5">{event.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
