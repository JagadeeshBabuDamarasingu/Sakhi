'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SellerDashboard } from './SellerDashboard'
import type { AIInsight, AnalyticsSummary, Listing, Order, SellerProfile } from './types'

interface MarketplaceData {
  sellerProfile: SellerProfile
  analyticsSummary: AnalyticsSummary
  recentOrders: Order[]
  lowStockListings: Listing[]
}

export function MarketplaceClient({ data }: { data: MarketplaceData }) {
  const router = useRouter()
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(data.analyticsSummary.aiInsights ?? [])

  useEffect(() => {
    fetch('/api/ai/marketplace/insights', { method: 'POST' })
      .then((res) => (res.ok ? res.json() : null))
      .then((insights: AIInsight[] | null) => {
        if (insights?.length) setAiInsights(insights)
      })
      .catch(() => {})
  }, [])

  const handleCreateListing = useCallback(() => {
    router.push('/marketplace/listings/new')
  }, [router])

  const handleGoLive = useCallback(async () => {
    const res = await fetch('/api/seller/live', { method: 'POST' })
    if (res.ok) {
      const { liveStream } = await res.json()
      router.push(`/marketplace/live/${liveStream.id}`)
    }
  }, [router])

  const handleInsightAction = useCallback((insight: AIInsight) => {
    const action = insight.action.toLowerCase()
    if (action.includes('listing') || action.includes('restock')) {
      router.push('/marketplace/listings')
      return
    }
    if (action.includes('price')) {
      router.push('/marketplace/listings?focus=pricing')
      return
    }
    router.push('/marketplace/insights')
  }, [router])

  const handlePreviewStorefront = useCallback(() => {
    router.push('/marketplace/storefront')
  }, [router])

  const handleExportAnalytics = useCallback(async () => {
    const res = await fetch('/api/seller/analytics/export')
    if (!res.ok) return

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'seller-analytics.csv'
    link.click()
    URL.revokeObjectURL(url)
  }, [])

  return (
    <SellerDashboard
      {...data}
      analyticsSummary={{ ...data.analyticsSummary, aiInsights }}
      onViewOrder={(orderId) => router.push(`/marketplace/orders/${orderId}`)}
      onViewListing={(listingId) => router.push(`/marketplace/listings/${listingId}`)}
      onCreateListing={handleCreateListing}
      onGoLive={handleGoLive}
      onPreviewStorefront={handlePreviewStorefront}
      onViewAllOrders={() => router.push('/marketplace/orders')}
      onViewAllListings={() => router.push('/marketplace/listings')}
      onInsightAction={handleInsightAction}
      onExportAnalytics={handleExportAnalytics}
    />
  )
}
