'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlinePlus,
  HiOutlineTag,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineArchiveBox,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2'
import type { Listing, ListingStatus } from '@/components/marketplace/types'

const STATUS_STYLES: Record<ListingStatus, { badge: string; label: string }> = {
  active: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Active' },
  draft: { badge: 'bg-stone-100 text-base-content/50', label: 'Draft' },
  out_of_stock: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', label: 'Out of stock' },
  archived: { badge: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', label: 'Archived' },
}

export function ListingsClient({ listings: initial }: { listings: Listing[] }) {
  const router = useRouter()
  const [listings, setListings] = useState(initial)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ListingStatus | 'all'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const visible = listings.filter((l) => {
    if (filter !== 'all' && l.status !== filter) return false
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  async function handleDelete(id: string) {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/seller/listings/${id}`, { method: 'DELETE' })
      if (res.ok) setListings((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setDeleting(null)
    }
  }

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
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Listings</h1>
            <p className="text-sm text-base-content/60 mt-1">{listings.length} total products</p>
          </div>
          <Link
            href="/marketplace/listings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
          >
            <HiOutlinePlus className="w-4 h-4" />
            New listing
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search listings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-base-100 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'active', 'draft', 'out_of_stock', 'archived'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === s
                    ? 'bg-rose-500 text-white'
                    : 'bg-base-100 text-base-content/50 border border-base-300 hover:border-rose-300'
                }`}
              >
                {s === 'all' ? 'All' : s === 'out_of_stock' ? 'Out of stock' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        {visible.length === 0 ? (
          <div className="text-center py-16 text-base-content/35">
            <HiOutlineTag className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm font-medium">No listings found</p>
            <p className="text-xs mt-1">Try adjusting your filters or create a new listing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visible.map((listing) => {
              const style = STATUS_STYLES[listing.status]
              const lowStock =
                listing.inventory.lowStockThreshold > 0 &&
                listing.inventory.quantity <= listing.inventory.lowStockThreshold

              return (
                <div
                  key={listing.id}
                  className="bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300 flex items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-base-200 flex-shrink-0 overflow-hidden">
                    {listing.images[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiOutlineTag className="w-6 h-6 text-base-content/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-base-content truncate">{listing.title}</p>
                        <p className="text-xs text-base-content/40 mt-0.5">{listing.category} · ₹{listing.price.toLocaleString('en-IN')}</p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-base-content/40">
                      <span>{listing.inventory.quantity} in stock</span>
                      {lowStock && <span className="text-amber-600 dark:text-amber-400 font-medium">Low stock</span>}
                      <span>{listing.soldCount} sold</span>
                      {listing.rating > 0 && <span>★ {listing.rating.toFixed(1)}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/marketplace/listings/${listing.id}`)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-base-content/50 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        <HiOutlinePencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <span className="text-base-content/20">·</span>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        disabled={deleting === listing.id}
                        className="inline-flex items-center gap-1 text-xs font-medium text-base-content/40 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
