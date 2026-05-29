'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineCheckCircle,
} from 'react-icons/hi2'

const CATEGORIES = [
  'Handicrafts', 'Textiles', 'Food & Beverages', 'Beauty & Wellness',
  'Home Decor', 'Jewellery', 'Electronics', 'Fashion', 'Art', 'Other',
]

const TYPES = [
  { value: 'product', label: 'Physical product', description: 'Ships to buyer' },
  { value: 'service', label: 'Service', description: 'Delivered in person or online' },
  { value: 'digital', label: 'Digital product', description: 'File download or access link' },
] as const

export function NewListingClient() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    type: 'product' as 'product' | 'service' | 'digital',
    quantity: '10',
    sku: '',
  })
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateDescription = useCallback(async () => {
    if (!form.title) return
    setGenerating(true)
    try {
      const res = await fetch('/api/ai/listings/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, category: form.category }),
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.description) set('description', data.description)
    } finally {
      setGenerating(false)
    }
  }, [form.title, form.category])

  const handleSave = useCallback(async () => {
    if (!form.title || !form.price || !form.category) return
    setSaving(true)
    try {
      const res = await fetch('/api/seller/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          type: form.type,
          status: 'draft',
          inventory: {
            quantity: parseInt(form.quantity, 10) || 0,
            lowStockThreshold: 3,
            sku: form.sku || `SKU-${Date.now()}`,
          },
        }),
      })
      if (!res.ok) return
      setDone(true)
      setTimeout(() => router.push('/marketplace/listings'), 1800)
    } finally {
      setSaving(false)
    }
  }, [form, router])

  if (done) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <HiOutlineCheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-xl font-bold text-base-content mb-2">Listing created!</h1>
          <p className="text-sm text-base-content/40">Saved as draft. Redirecting to listings…</p>
        </div>
      </div>
    )
  }

  const isValid = form.title.trim() && form.price && parseFloat(form.price) > 0 && form.category

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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Marketplace</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">New Listing</h1>
            <p className="text-sm text-base-content/60 mt-1">Add a product or service to your store</p>
          </div>
          <HiOutlineTag className="w-7 h-7 text-primary flex-shrink-0" />
        </div>

        {/* Type selector */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Listing type</p>
          <div className="grid grid-cols-3 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => set('type', t.value)}
                className={`p-3 rounded-xl border-2 text-left transition-colors ${
                  form.type === t.value
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'border-stone-100 hover:border-rose-200'
                }`}
              >
                <p className={`text-xs font-semibold ${form.type === t.value ? 'text-rose-600 dark:text-rose-400' : 'text-base-content/80'}`}>
                  {t.label}
                </p>
                <p className="text-[10px] text-base-content/40 mt-0.5">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main form */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Handwoven Cotton Saree"
              className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                Description
              </label>
              <button
                onClick={handleGenerateDescription}
                disabled={generating || !form.title}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 disabled:opacity-40 transition-colors"
              >
                {generating ? (
                  <span className="w-3 h-3 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
                ) : (
                  <HiOutlineSparkles className="w-3.5 h-3.5" />
                )}
                AI generate
              </button>
            </div>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe your product in detail…"
              rows={4}
              className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">
                Price (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {form.type === 'product' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">
                  Stock quantity
                </label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => set('quantity', e.target.value)}
                  min="0"
                  className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-1.5">
                  SKU
                </label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => set('sku', e.target.value)}
                  placeholder="Auto-generated"
                  className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-base-content/40 mb-4 text-center">
          Listing will be saved as a draft. Publish it from the listings page when ready.
        </p>

        <button
          onClick={handleSave}
          disabled={saving || !isValid}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-2xl shadow-sm transition-all disabled:opacity-60"
        >
          {saving ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <HiOutlineCheckCircle className="w-5 h-5" />
          )}
          Save as draft
        </button>
      </div>
    </div>
  )
}
