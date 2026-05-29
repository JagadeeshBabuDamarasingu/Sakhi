'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineExclamationTriangle,
  HiOutlineArrowTrendingUp,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowDownTray,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2'
import type { AnalyticsSummary, AIInsight, InsightType } from '@/components/marketplace/types'

const INSIGHT_STYLES: Record<InsightType, { icon: React.ReactNode; badge: string; border: string }> = {
  opportunity: {
    icon: <HiOutlineArrowTrendingUp className="w-5 h-5 text-emerald-500" />,
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    border: 'border-l-emerald-400',
  },
  alert: {
    icon: <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-500" />,
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    border: 'border-l-amber-400',
  },
  suggestion: {
    icon: <HiOutlineLightBulb className="w-5 h-5 text-blue-500" />,
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    border: 'border-l-blue-400',
  },
}

function StatCard({ label, value, change }: { label: string; value: string; change?: number }) {
  return (
    <div className="bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300">
      <p className="text-xs text-base-content/40 mb-1">{label}</p>
      <p className="text-lg font-bold text-base-content">{value}</p>
      {change !== undefined && (
        <p className={`text-xs font-medium mt-0.5 ${change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}% vs last period
        </p>
      )}
    </div>
  )
}

export function InsightsClient({ analytics }: { analytics: AnalyticsSummary }) {
  const router = useRouter()
  const [insights, setInsights] = useState<AIInsight[]>(analytics.aiInsights)
  const [refreshing, setRefreshing] = useState(false)
  const [exporting, setExporting] = useState(false)

  const { overview, topProducts, keywordRankings, revenueByDay } = analytics

  const maxRevenue = Math.max(...revenueByDay.map((d) => d.revenue), 1)

  const handleRefreshInsights = useCallback(async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/ai/marketplace/insights', { method: 'POST' })
      if (!res.ok) return
      const data = await res.json()
      if (data.insights) setInsights(data.insights)
    } finally {
      setRefreshing(false)
    }
  }, [])

  const handleExport = useCallback(async () => {
    setExporting(true)
    try {
      const res = await fetch('/api/seller/analytics/export')
      if (!res.ok) return
      const text = await res.text()
      const blob = new Blob([text], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }, [])

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
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Insights</h1>
            <p className="text-sm text-base-content/60 mt-1">Period: {analytics.period}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="p-2 rounded-xl bg-base-100 ring-1 ring-base-300 text-base-content/40 hover:text-base-content/70 transition-colors disabled:opacity-50"
              title="Export CSV"
            >
              <HiOutlineArrowDownTray className="w-4 h-4" />
            </button>
            <HiOutlineChartBarSquare className="w-6 h-6 text-rose-500" />
          </div>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Revenue"
            value={`₹${(overview.totalRevenue / 1000).toFixed(1)}k`}
            change={overview.revenueChange}
          />
          <StatCard
            label="Orders"
            value={String(overview.totalOrders)}
            change={overview.ordersChange}
          />
          <StatCard
            label="Store views"
            value={overview.totalViews.toLocaleString('en-IN')}
            change={overview.viewsChange}
          />
          <StatCard
            label="Conversion"
            value={`${overview.conversionRate}%`}
            change={overview.conversionChange}
          />
        </div>

        {/* Revenue chart */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-5">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Revenue — last 30 days</p>
          <div className="flex items-end gap-0.5 h-24">
            {revenueByDay.map((day, i) => (
              <div
                key={i}
                title={`${day.date}: ₹${day.revenue.toLocaleString('en-IN')}`}
                className="flex-1 bg-rose-200 dark:bg-rose-900/50 rounded-t hover:bg-rose-400 dark:hover:bg-rose-600 transition-colors"
                style={{ height: `${Math.max(4, (day.revenue / maxRevenue) * 100)}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-base-content/40">
            <span>{revenueByDay[0]?.date?.slice(5)}</span>
            <span>{revenueByDay[revenueByDay.length - 1]?.date?.slice(5)}</span>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest">AI Insights</p>
            <button
              onClick={handleRefreshInsights}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 disabled:opacity-40 transition-colors"
            >
              {refreshing ? (
                <span className="w-3.5 h-3.5 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
              ) : (
                <HiOutlineSparkles className="w-3.5 h-3.5" />
              )}
              Refresh
            </button>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => {
              const style = INSIGHT_STYLES[insight.type]
              return (
                <div
                  key={i}
                  className={`bg-base-100 rounded-2xl p-4 shadow-sm ring-1 ring-base-300 border-l-4 ${style.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-base-content">{insight.title}</p>
                        <span className={`flex-shrink-0 text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full ${style.badge}`}>
                          {insight.type}
                        </span>
                      </div>
                      <p className="text-xs text-base-content/50 leading-relaxed mt-1">{insight.description}</p>
                      <button
                        onClick={() => {
                          if (insight.action.toLowerCase().includes('pricing')) router.push('/marketplace/listings?focus=pricing')
                          else if (insight.action.toLowerCase().includes('listing')) router.push('/marketplace/listings')
                          else router.push('/marketplace/listings')
                        }}
                        className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 mt-2 transition-colors"
                      >
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300 mb-5">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">Top products</p>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-bold text-base-content/30 w-5 text-center">{i + 1}</span>
                <button
                  onClick={() => router.push(`/marketplace/listings/${product.listingId}`)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-sm font-medium text-base-content/80 truncate hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    {product.title}
                  </p>
                  <p className="text-xs text-base-content/40">{product.sales} sales · ₹{product.revenue.toLocaleString('en-IN')}</p>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword rankings */}
        {keywordRankings.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-5 shadow-sm ring-1 ring-base-300">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineMagnifyingGlass className="w-4 h-4 text-base-content/40" />
              <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest">Keyword rankings</p>
            </div>
            <div className="space-y-2">
              {keywordRankings.map((kw, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <span className="text-sm font-semibold text-base-content/80 w-6 text-center">#{kw.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-base-content/80 truncate">{kw.keyword}</p>
                    <p className="text-xs text-base-content/40">{kw.searchVolume.toLocaleString()} searches/mo</p>
                  </div>
                  <span className={`text-xs font-semibold ${kw.change < 0 ? 'text-emerald-600 dark:text-emerald-400' : kw.change > 0 ? 'text-red-500' : 'text-base-content/40'}`}>
                    {kw.change < 0 ? `↑${Math.abs(kw.change)}` : kw.change > 0 ? `↓${kw.change}` : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
