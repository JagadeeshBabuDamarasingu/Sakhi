import type {
  SellerProfile,
  AnalyticsSummary,
  AIInsight,
  TopProduct,
  KeywordRanking,
  Order,
  Listing,
} from './types'
import { StatCard } from './StatCard'
import { RevenueChart } from './RevenueChart'
import { AIInsightCard } from './AIInsightCard'
import { TopProductsTable } from './TopProductsTable'
import { KeywordRankingsTable } from './KeywordRankingsTable'
import { TrafficSourcesChart } from './TrafficSourcesChart'
import { RecentOrdersTable } from './RecentOrdersTable'
import { QuickActions } from './QuickActions'

export interface SellerDashboardProps {
  sellerProfile: SellerProfile
  analyticsSummary: AnalyticsSummary
  recentOrders: Order[]
  lowStockListings: Listing[]
  onViewOrder?: (orderId: string) => void
  onViewListing?: (listingId: string) => void
  onCreateListing?: () => void
  onGoLive?: () => void
  onViewAllOrders?: () => void
  onViewAllListings?: () => void
  onInsightAction?: (insight: AIInsight) => void
  onExportAnalytics?: () => void
}

export function SellerDashboard({
  sellerProfile,
  analyticsSummary,
  recentOrders,
  lowStockListings,
  onViewOrder,
  onViewListing,
  onCreateListing,
  onGoLive,
  onViewAllOrders,
  onViewAllListings,
  onInsightAction,
  onExportAnalytics,
}: SellerDashboardProps) {
  const { overview, topProducts, trafficSources, revenueByDay, aiInsights, keywordRankings } =
    analyticsSummary

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Decorative gradient header */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-primary/10 via-secondary/5 to-base-200 -z-10" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-primary tracking-wide uppercase">
              Welcome back
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content mt-1">
              {sellerProfile.storeName}
            </h1>
            <p className="text-base-content/70 mt-1 text-sm sm:text-base">
              Here&apos;s how your store is performing
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onExportAnalytics}
              aria-label="Export seller analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-base-content/70 bg-base-100 border border-base-300 rounded-xl hover:bg-base-200 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export
            </button>
            <span className="text-xs text-base-content/60 bg-base-200 px-3 py-2 rounded-lg">
              Last 30 days
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onCreateListing={onCreateListing} onGoLive={onGoLive} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(overview.totalRevenue)}
            change={overview.revenueChange}
            icon="currency"
            accentColor="rose"
          />
          <StatCard
            label="Orders"
            value={formatNumber(overview.totalOrders)}
            change={overview.ordersChange}
            icon="orders"
            accentColor="amber"
          />
          <StatCard
            label="Store Views"
            value={formatNumber(overview.totalViews)}
            change={overview.viewsChange}
            icon="views"
            accentColor="stone"
          />
          <StatCard
            label="Conversion Rate"
            value={`${overview.conversionRate}%`}
            change={overview.conversionChange}
            icon="conversion"
            accentColor="rose"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart - Full Width on Mobile, 2 cols on Desktop */}
          <div className="lg:col-span-2">
            <RevenueChart data={revenueByDay} />
          </div>

          {/* Traffic Sources */}
          <div className="lg:col-span-1">
            <TrafficSourcesChart data={trafficSources} />
          </div>
        </div>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-base-content">
                AI Insights
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <AIInsightCard
                  key={index}
                  insight={insight}
                  onAction={() => onInsightAction?.(insight)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <TopProductsTable
            products={topProducts}
            onViewProduct={onViewListing}
            onViewAll={onViewAllListings}
          />

          {/* Keyword Rankings */}
          <KeywordRankingsTable rankings={keywordRankings} />
        </div>

        {/* Recent Orders */}
        <RecentOrdersTable
          orders={recentOrders}
          onViewOrder={onViewOrder}
          onViewAll={onViewAllOrders}
        />

        {/* Low Stock Alert */}
        {lowStockListings.length > 0 && (
          <div className="mt-8 p-4 bg-warning/10 border border-warning/30 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-warning-content">
                  Low Stock Alert
                </h3>
                <p className="text-sm text-warning mt-1">
                  {lowStockListings.length} product{lowStockListings.length > 1 ? 's are' : ' is'}{' '}
                  running low on inventory
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {lowStockListings.slice(0, 3).map((listing) => (
                    <button
                      key={listing.id}
                      onClick={() => onViewListing?.(listing.id)}
                      className="text-xs font-medium text-warning bg-warning/15 px-3 py-1.5 rounded-lg hover:bg-warning/25 transition-colors"
                    >
                      {listing.title.length > 25
                        ? listing.title.substring(0, 25) + '...'
                        : listing.title}
                    </button>
                  ))}
                  {lowStockListings.length > 3 && (
                    <span className="text-xs text-secondary px-2 py-1.5">
                      +{lowStockListings.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
