export type ListingType = 'product' | 'service' | 'digital'

export type ListingStatus = 'active' | 'draft' | 'out_of_stock' | 'archived'

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'return_requested'
  | 'returned'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'UPI' | 'Card' | 'Wallet' | 'COD' | 'BNPL'

export type CouponType = 'percentage' | 'fixed' | 'free_shipping'

export type CouponStatus = 'active' | 'expired' | 'disabled'

export type LiveStreamStatus = 'scheduled' | 'live' | 'ended'

export type InsightType = 'opportunity' | 'alert' | 'suggestion'

export interface Location {
  city: string
  state: string
  pincode: string
}

export interface SocialLinks {
  instagram: string | null
  whatsapp: string | null
  youtube: string | null
}

export interface BrandColors {
  primary: string
  secondary: string
}

export interface SellerProfile {
  id: string
  userId: string
  storeName: string
  tagline: string
  bio: string
  profileImage: string
  coverImage: string
  skills: string[]
  location: Location
  socialLinks: SocialLinks
  brandColors: BrandColors
  badges: string[]
  rating: number
  totalReviews: number
  totalSales: number
  memberSince: string
  responseTime: string
  shippingPolicy: string
  returnPolicy: string
  ondcRegistered: boolean
  ondcSellerId: string | null
}

export interface Inventory {
  quantity: number
  lowStockThreshold: number
  sku: string
}

export interface Variant {
  name: string
  options: string[]
}

export interface Listing {
  id: string
  sellerId: string
  type: ListingType
  title: string
  description: string
  category: string
  categoryId: string
  subcategory: string
  images: string[]
  video: string | null
  price: number
  compareAtPrice: number | null
  currency: string
  inventory: Inventory
  variants: Variant[]
  specifications: Record<string, string>
  tags: string[]
  status: ListingStatus
  featured: boolean
  views: number
  wishlistCount: number
  soldCount: number
  rating: number
  reviewCount: number
  shippingWeight: number
  ondcCategoryId: string
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: string
  sellerId: string
  listingId: string | null
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  duration: number
  views: number
  likes: number
  comments: number
  shares: number
  isLive: boolean
  products: string[]
  createdAt: string
}

export interface OrderItem {
  listingId: string
  title: string
  variant: string | null
  quantity: number
  price: number
  image: string
}

export interface ShippingAddress {
  name: string
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface Tracking {
  carrier: string
  trackingNumber: string
  estimatedDelivery: string
  currentStatus: string
  lastUpdate: string
}

export interface OrderTimelineEvent {
  status: string
  timestamp: string
  note?: string
}

export interface Order {
  id: string
  orderNumber: string
  sellerId: string
  buyerId: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  couponCode: string | null
  total: number
  currency: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  status: OrderStatus
  shippingAddress: ShippingAddress | null
  tracking: Tracking | null
  timeline: OrderTimelineEvent[]
  createdAt: string
}

export interface SellerResponse {
  content: string
  timestamp: string
}

export interface Review {
  id: string
  listingId: string
  orderId: string
  buyerId: string
  buyerName: string
  rating: number
  title: string
  content: string
  images: string[]
  helpfulCount: number
  verified: boolean
  sellerResponse: SellerResponse | null
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  subcategories: string[]
  productCount: number
  image: string
}

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  minOrderValue: number
  maxDiscount: number
  description: string
  usageLimit: number | null
  usedCount: number
  validFrom: string
  validUntil: string
  status: CouponStatus
  applicableListings: string[] | 'all'
}

export interface LiveStream {
  id: string
  sellerId: string
  title: string
  description: string
  thumbnailUrl: string
  status: LiveStreamStatus
  viewerCount: number
  likeCount: number
  startedAt?: string
  scheduledAt?: string
  scheduledDuration: number
  featuredProducts: string[]
  chatEnabled: boolean
  reminderCount?: number
}

export interface AnalyticsOverview {
  totalViews: number
  viewsChange: number
  totalOrders: number
  ordersChange: number
  totalRevenue: number
  revenueChange: number
  conversionRate: number
  conversionChange: number
}

export interface TopProduct {
  listingId: string
  title: string
  sales: number
  revenue: number
}

export interface TrafficSource {
  source: string
  percentage: number
}

export interface RevenueByDay {
  date: string
  revenue: number
}

export interface AIInsight {
  type: InsightType
  title: string
  description: string
  action: string
}

export interface KeywordRanking {
  keyword: string
  rank: number
  change: number
  searchVolume: number
}

export interface AnalyticsSummary {
  period: string
  overview: AnalyticsOverview
  topProducts: TopProduct[]
  trafficSources: TrafficSource[]
  revenueByDay: RevenueByDay[]
  aiInsights: AIInsight[]
  keywordRankings: KeywordRanking[]
}

export interface CartItem {
  id: string
  listingId: string
  sellerId: string
  title: string
  variant: string | null
  image: string
  price: number
  quantity: number
}
