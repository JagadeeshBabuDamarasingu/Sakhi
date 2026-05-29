'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineVideoCamera,
  HiOutlineUsers,
  HiOutlineHeart,
  HiOutlineStopCircle,
  HiOutlineCheckCircle,
  HiOutlineStar,
} from 'react-icons/hi2'
import type { LiveStream } from '@/components/marketplace/types'

export function LiveSessionClient({ stream: initial }: { stream: LiveStream }) {
  const router = useRouter()
  const [stream, setStream] = useState(initial)
  const [viewers, setViewers] = useState(initial.viewerCount)
  const [ending, setEnding] = useState(false)
  const [ended, setEnded] = useState(initial.status === 'ended')

  // Simulate viewer count fluctuation for live streams
  useEffect(() => {
    if (stream.status !== 'live') return
    const interval = setInterval(() => {
      setViewers((v) => Math.max(0, v + Math.floor(Math.random() * 7) - 2))
    }, 3000)
    return () => clearInterval(interval)
  }, [stream.status])

  const handleEnd = useCallback(async () => {
    if (!confirm('End this live session?')) return
    setEnding(true)
    try {
      const res = await fetch(`/api/seller/live/${stream.id}`, { method: 'DELETE' })
      if (!res.ok) return
      const updated = await res.json()
      setStream(updated)
      setEnded(true)
    } finally {
      setEnding(false)
    }
  }, [stream.id])

  const duration = stream.startedAt
    ? Math.round((Date.now() - new Date(stream.startedAt).getTime()) / 60000)
    : 0

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Video frame */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-900 via-stone-900 to-stone-950 aspect-video mb-5 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <HiOutlineVideoCamera className="w-12 h-12 text-white/80" />
              </div>
              <p className="text-white/60 text-sm">{stream.title}</p>
            </div>
          </div>

          {/* Live badge */}
          {stream.status === 'live' && !ended && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </span>
              {duration > 0 && (
                <span className="bg-black/60 text-white/80 text-xs px-2.5 py-1 rounded-full">
                  {duration}m
                </span>
              )}
            </div>
          )}

          {ended && (
            <div className="absolute top-4 left-4">
              <span className="bg-stone-800/80 text-base-content/40 text-xs font-bold px-3 py-1.5 rounded-full">
                ENDED
              </span>
            </div>
          )}

          {/* Viewer count */}
          {stream.status === 'live' && !ended && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-black/60 text-white/80 text-xs px-2.5 py-1 rounded-full">
                <HiOutlineUsers className="w-3.5 h-3.5" />
                {viewers.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5 bg-black/60 text-white/80 text-xs px-2.5 py-1 rounded-full">
                <HiOutlineHeart className="w-3.5 h-3.5 text-rose-400" />
                {stream.likeCount}
              </span>
            </div>
          )}
        </div>

        {/* Session info */}
        <div className="bg-stone-900 rounded-2xl p-5 ring-1 ring-stone-800 mb-4">
          <h1 className="text-lg font-bold mb-1">{stream.title}</h1>
          <p className="text-sm text-base-content/40 leading-relaxed">{stream.description}</p>
          {stream.startedAt && (
            <p className="text-xs text-base-content/50 mt-2">
              Started {new Date(stream.startedAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          )}
        </div>

        {/* Featured products */}
        {stream.featuredProducts.length > 0 && (
          <div className="bg-stone-900 rounded-2xl p-5 ring-1 ring-stone-800 mb-4">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">Featured products</p>
            <div className="flex flex-wrap gap-2">
              {stream.featuredProducts.map((productId) => (
                <Link
                  key={productId}
                  href={`/marketplace/listings/${productId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-base-200 rounded-full text-xs text-base-content/30 transition-colors"
                >
                  <HiOutlineStar className="w-3 h-3 text-amber-400" />
                  {productId}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* End session */}
        {ended ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mx-auto">
              <HiOutlineCheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-base-content/30">Session ended</p>
            <button
              onClick={() => router.push('/marketplace')}
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={handleEnd}
            disabled={ending}
            className="w-full flex items-center justify-center gap-2 py-3.5 border border-red-800 text-red-400 hover:bg-red-950/50 font-semibold text-sm rounded-2xl transition-colors disabled:opacity-50"
          >
            {ending ? (
              <span className="w-5 h-5 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin" />
            ) : (
              <HiOutlineStopCircle className="w-5 h-5" />
            )}
            End live session
          </button>
        )}
      </div>
    </div>
  )
}
