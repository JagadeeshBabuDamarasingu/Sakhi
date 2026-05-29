'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineTag,
  HiOutlineArchiveBox,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlinePlayCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2'
import type { Listing, ListingStatus } from '@/components/marketplace/types'

const STATUS_STYLES: Record<ListingStatus, { badge: string; label: string }> = {
  active: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Active' },
  draft: { badge: 'bg-stone-100 text-base-content/50', label: 'Draft' },
  out_of_stock: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', label: 'Out of stock' },
  archived: { badge: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', label: 'Archived' },
}

export function ListingDetailClient({ listing: initial }: { listing: Listing }) {
  const router = useRouter()
  const [listing, setListing] = useState(initial)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const media = listing.images.slice(0, 5)
  const totalSlides = media.length + (listing.video ? 1 : 0)

  function prevSlide() {
    if (showVideo) { setShowVideo(false); setActiveIndex(media.length - 1); return }
    setActiveIndex((i) => (i - 1 + media.length) % media.length)
  }
  function nextSlide() {
    const atLast = activeIndex === media.length - 1
    if (atLast && listing.video && !showVideo) { setShowVideo(true); return }
    if (showVideo) { setShowVideo(false); setActiveIndex(0); return }
    setActiveIndex((i) => (i + 1) % media.length)
  }

  const [form, setForm] = useState({
    title: initial.title,
    description: initial.description,
    price: String(initial.price),
    quantity: String(initial.inventory.quantity),
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/seller/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          inventory: { ...listing.inventory, quantity: parseInt(form.quantity, 10) },
        }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setListing(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }, [form, listing])

  async function handleStatusChange(status: ListingStatus) {
    const res = await fetch(`/api/seller/listings/${listing.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return
    const updated = await res.json()
    setListing(updated)
  }

  async function handleDelete() {
    if (!confirm('Delete this listing permanently?')) return
    setDeleting(true)
    const res = await fetch(`/api/seller/listings/${listing.id}`, { method: 'DELETE' })
    if (res.ok) router.push('/marketplace/listings')
    else setDeleting(false)
  }

  const style = STATUS_STYLES[listing.status]

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/marketplace/listings"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>

        {/* Hero — image/video gallery */}
        <div className="bg-base-100 rounded-2xl overflow-hidden shadow-sm ring-1 ring-base-300 mb-5">
          {totalSlides > 0 && (
            <div className="relative aspect-video bg-base-200 overflow-hidden group">
              {/* Main view */}
              {showVideo ? (
                <video
                  src={listing.video!}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              ) : media[activeIndex] ? (
                <img
                  src={media[activeIndex]}
                  alt={`${listing.title} — image ${activeIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : null}

              {/* Prev / Next arrows — only when more than one slide */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous"
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next"
                  >
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Slide counter pill */}
              {totalSlides > 1 && (
                <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {showVideo ? `${totalSlides}/${totalSlides}` : `${activeIndex + 1}/${totalSlides}`}
                </span>
              )}
            </div>
          )}

          {/* Thumbnail strip — shown when there are 2+ slides */}
          {totalSlides > 1 && (
            <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto scrollbar-none">
              {media.map((src, i) => (
                <button
                  key={i}
                  onClick={() => { setShowVideo(false); setActiveIndex(i) }}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden ring-2 transition-all ${
                    !showVideo && activeIndex === i
                      ? 'ring-rose-500 opacity-100'
                      : 'ring-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {listing.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden ring-2 bg-base-300 flex items-center justify-center transition-all ${
                    showVideo ? 'ring-rose-500 opacity-100' : 'ring-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <HiOutlinePlayCircle className="w-6 h-6 text-base-content/60" />
                </button>
              )}
            </div>
          )}

          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>{style.label}</span>
              <span className="text-xs text-base-content/40">{listing.category}</span>
              {listing.featured && (
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-1 text-base-content/40">
                <HiOutlineEye className="w-4 h-4" />
                <span className="text-[10px]">{listing.views}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-base-content/40">
                <HiOutlineHeart className="w-4 h-4" />
                <span className="text-[10px]">{listing.wishlistCount}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-base-content/40">
                <HiOutlineShoppingBag className="w-4 h-4" />
                <span className="text-[10px]">{listing.soldCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4 space-y-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest">Edit details</p>

          <div>
            <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                min="0"
                className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">Stock qty</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => set('quantity', e.target.value)}
                min="0"
                className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <HiOutlineCheckCircle className="w-4 h-4" />
            ) : (
              <HiOutlineTag className="w-4 h-4" />
            )}
            {saved ? 'Saved!' : 'Save changes'}
          </button>
        </div>

        {/* Status actions */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Status</p>
          <div className="flex flex-wrap gap-2">
            {(['active', 'draft', 'archived'] as ListingStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={listing.status === s}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 ${
                  listing.status === s
                    ? STATUS_STYLES[s].badge + ' cursor-default'
                    : 'bg-base-200 text-base-content/50 hover:bg-base-200'
                }`}
              >
                {STATUS_STYLES[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-sm rounded-2xl transition-colors disabled:opacity-50"
        >
          <HiOutlineTrash className="w-4 h-4" />
          Delete listing permanently
        </button>
      </div>
    </div>
  )
}
