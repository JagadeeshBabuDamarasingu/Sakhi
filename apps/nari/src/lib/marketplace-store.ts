import sampleData from '../../product-plan/sections/marketplace/sample-data.json'
import type {
  AnalyticsSummary,
  Listing,
  LiveStream,
  Order,
  SellerProfile,
} from '@/components/marketplace/types'

type MarketplaceSeed = {
  sellerProfile: SellerProfile
  listings: Listing[]
  orders: Order[]
  liveStreams: LiveStream[]
  analyticsSummary: AnalyticsSummary
}

const seed = sampleData as unknown as MarketplaceSeed

let sellerProfile = seed.sellerProfile
let listings = [...seed.listings]
let orders = [...seed.orders]
let liveStreams = [...seed.liveStreams]
let analyticsSummary = {
  ...seed.analyticsSummary,
  revenueByDay: normalizeRevenueByDay(seed.analyticsSummary.revenueByDay),
}

function normalizeRevenueByDay(days: AnalyticsSummary['revenueByDay']) {
  if (days.length >= 30) return days.slice(-30)

  const lastDate = days.at(-1)?.date ?? new Date().toISOString()
  const byDate = new Map(days.map((day) => [day.date.slice(0, 10), day.revenue]))
  const end = new Date(lastDate)

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(end)
    date.setDate(end.getDate() - (29 - index))
    const key = date.toISOString().slice(0, 10)

    return {
      date: key,
      revenue: byDate.get(key) ?? 0,
    }
  })
}

const byNewest = (a: { createdAt?: string }, b: { createdAt?: string }) => {
  return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
}

export function getSellerProfile() {
  return sellerProfile
}

export function getSellerAnalytics() {
  return analyticsSummary
}

export function getSellerOrders({ limit, page = 1 }: { limit?: number; page?: number } = {}) {
  const sorted = [...orders].sort(byNewest)
  if (!limit) return sorted

  const start = (page - 1) * limit
  return sorted.slice(start, start + limit)
}

export function getSellerListings() {
  return [...listings].sort(byNewest)
}

export function getLowStockListings() {
  return listings.filter((listing) => {
    const { quantity, lowStockThreshold } = listing.inventory
    return lowStockThreshold > 0 && quantity <= lowStockThreshold
  })
}

export function createSellerListing(
  listing: Pick<Listing, 'title' | 'description' | 'price' | 'category'> & Partial<Listing>
) {
  const now = new Date().toISOString()
  const newListing: Listing = {
    id: `listing-${Date.now()}`,
    sellerId: sellerProfile.id,
    type: listing.type ?? 'product',
    title: listing.title,
    description: listing.description,
    category: listing.category,
    categoryId: listing.categoryId ?? 'cat-custom',
    subcategory: listing.subcategory ?? 'General',
    images: listing.images ?? [],
    video: listing.video ?? null,
    price: listing.price,
    compareAtPrice: listing.compareAtPrice ?? null,
    currency: listing.currency ?? 'INR',
    inventory: listing.inventory ?? {
      quantity: 0,
      lowStockThreshold: 3,
      sku: `SKU-${Date.now()}`,
    },
    variants: listing.variants ?? [],
    specifications: listing.specifications ?? {},
    tags: listing.tags ?? [],
    status: listing.status ?? 'draft',
    featured: listing.featured ?? false,
    views: listing.views ?? 0,
    wishlistCount: listing.wishlistCount ?? 0,
    soldCount: listing.soldCount ?? 0,
    rating: listing.rating ?? 0,
    reviewCount: listing.reviewCount ?? 0,
    shippingWeight: listing.shippingWeight ?? 0,
    ondcCategoryId: listing.ondcCategoryId ?? 'General',
    createdAt: now,
    updatedAt: now,
  }

  listings = [newListing, ...listings]
  return newListing
}

export function startSellerLiveSession() {
  const now = new Date().toISOString()
  const liveStream: LiveStream = {
    id: `live-${Date.now()}`,
    sellerId: sellerProfile.id,
    title: `${sellerProfile.storeName} live sale`,
    description: 'Live selling session started from the seller dashboard.',
    thumbnailUrl: sellerProfile.coverImage,
    status: 'live',
    viewerCount: 0,
    likeCount: 0,
    startedAt: now,
    scheduledDuration: 60,
    featuredProducts: listings
      .filter((listing) => listing.status === 'active')
      .slice(0, 3)
      .map((listing) => listing.id),
    chatEnabled: true,
  }

  liveStreams = [liveStream, ...liveStreams]
  return liveStream
}

export function getMarketplaceDashboardData() {
  return {
    sellerProfile,
    analyticsSummary,
    recentOrders: getSellerOrders({ limit: 5 }),
    lowStockListings: getLowStockListings(),
  }
}

export function getAnalyticsCsv() {
  const rows = [
    ['Metric', 'Value'],
    ['Total Revenue', analyticsSummary.overview.totalRevenue],
    ['Total Orders', analyticsSummary.overview.totalOrders],
    ['Store Views', analyticsSummary.overview.totalViews],
    ['Conversion Rate', `${analyticsSummary.overview.conversionRate}%`],
    [],
    ['Date', 'Revenue'],
    ...analyticsSummary.revenueByDay.map((day) => [day.date, day.revenue]),
  ]

  return rows.map((row) => row.join(',')).join('\n')
}
