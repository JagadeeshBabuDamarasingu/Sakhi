// =============================================================================
// Data Types
// =============================================================================

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

// =============================================================================
// Component Props - Seller Dashboard
// =============================================================================

export interface MarketplaceSellerProps {
  /** Seller's profile and storefront information */
  sellerProfile: SellerProfile
  /** All listings by this seller */
  listings: Listing[]
  /** Product videos created by seller */
  videos: Video[]
  /** Orders received by seller */
  orders: Order[]
  /** Customer reviews on seller's products */
  reviews: Review[]
  /** Coupons created by seller */
  coupons: Coupon[]
  /** Live streams (active and scheduled) */
  liveStreams: LiveStream[]
  /** Analytics dashboard data */
  analyticsSummary: AnalyticsSummary
  /** Available categories for listing */
  categories: Category[]

  // === Profile Actions ===
  /** Called when seller wants to edit their profile */
  onEditProfile?: () => void
  /** Called when seller updates storefront branding */
  onUpdateBranding?: (colors: BrandColors) => void

  // === Listing Actions ===
  /** Called when seller wants to create a new listing */
  onCreateListing?: () => void
  /** Called when seller wants to view a listing */
  onViewListing?: (listingId: string) => void
  /** Called when seller wants to edit a listing */
  onEditListing?: (listingId: string) => void
  /** Called when seller wants to delete a listing */
  onDeleteListing?: (listingId: string) => void
  /** Called when seller wants to duplicate a listing */
  onDuplicateListing?: (listingId: string) => void
  /** Called when seller uses AI to generate description */
  onGenerateDescription?: (listingId: string) => void
  /** Called when seller uses AI to enhance images */
  onEnhanceImages?: (listingId: string) => void
  /** Called when seller wants to bulk edit listings */
  onBulkEditListings?: (listingIds: string[]) => void

  // === Video Actions ===
  /** Called when seller wants to upload a new video */
  onUploadVideo?: () => void
  /** Called when seller wants to view a video */
  onViewVideo?: (videoId: string) => void
  /** Called when seller wants to delete a video */
  onDeleteVideo?: (videoId: string) => void

  // === Order Actions ===
  /** Called when seller wants to view order details */
  onViewOrder?: (orderId: string) => void
  /** Called when seller updates order status */
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void
  /** Called when seller wants to message buyer */
  onMessageBuyer?: (orderId: string) => void
  /** Called when seller processes a return */
  onProcessReturn?: (orderId: string) => void
  /** Called when seller prints shipping label */
  onPrintLabel?: (orderId: string) => void

  // === Review Actions ===
  /** Called when seller responds to a review */
  onRespondToReview?: (reviewId: string, response: string) => void

  // === Coupon Actions ===
  /** Called when seller creates a new coupon */
  onCreateCoupon?: () => void
  /** Called when seller edits a coupon */
  onEditCoupon?: (couponId: string) => void
  /** Called when seller deletes a coupon */
  onDeleteCoupon?: (couponId: string) => void

  // === Live Stream Actions ===
  /** Called when seller starts a live stream */
  onGoLive?: () => void
  /** Called when seller schedules a live stream */
  onScheduleLive?: () => void
  /** Called when seller ends a live stream */
  onEndLive?: (streamId: string) => void
  /** Called when seller cancels a scheduled stream */
  onCancelScheduledLive?: (streamId: string) => void

  // === Analytics Actions ===
  /** Called when seller wants to export analytics */
  onExportAnalytics?: () => void
  /** Called when AI insight action is clicked */
  onInsightAction?: (insight: AIInsight) => void

  // === ONDC Actions ===
  /** Called when seller syncs with ONDC */
  onSyncONDC?: () => void
  /** Called when seller views ONDC settings */
  onONDCSettings?: () => void
}

// =============================================================================
// Component Props - Public Storefront (Buyer View)
// =============================================================================

export interface MarketplaceBuyerProps {
  /** All product categories */
  categories: Category[]
  /** Featured/trending listings */
  featuredListings: Listing[]
  /** Video feed content */
  videos: Video[]
  /** Active live streams */
  liveStreams: LiveStream[]
  /** Shopping cart items */
  cartItems: CartItem[]

  // === Browse Actions ===
  /** Called when buyer selects a category */
  onSelectCategory?: (categoryId: string) => void
  /** Called when buyer searches */
  onSearch?: (query: string) => void
  /** Called when buyer uses visual search */
  onVisualSearch?: (image: File) => void
  /** Called when buyer applies filters */
  onApplyFilters?: (filters: Record<string, any>) => void

  // === Listing Actions ===
  /** Called when buyer views a listing */
  onViewListing?: (listingId: string) => void
  /** Called when buyer adds to wishlist */
  onAddToWishlist?: (listingId: string) => void
  /** Called when buyer removes from wishlist */
  onRemoveFromWishlist?: (listingId: string) => void
  /** Called when buyer subscribes to back-in-stock */
  onBackInStockAlert?: (listingId: string) => void

  // === Cart Actions ===
  /** Called when buyer adds to cart */
  onAddToCart?: (listingId: string, variant?: string, quantity?: number) => void
  /** Called when buyer updates cart quantity */
  onUpdateCartQuantity?: (cartItemId: string, quantity: number) => void
  /** Called when buyer removes from cart */
  onRemoveFromCart?: (cartItemId: string) => void
  /** Called when buyer applies coupon */
  onApplyCoupon?: (code: string) => void
  /** Called when buyer proceeds to checkout */
  onCheckout?: () => void
  /** Called when buyer uses express checkout */
  onExpressCheckout?: () => void

  // === Video Actions ===
  /** Called when buyer likes a video */
  onLikeVideo?: (videoId: string) => void
  /** Called when buyer shares a video */
  onShareVideo?: (videoId: string) => void
  /** Called when buyer comments on a video */
  onCommentVideo?: (videoId: string, comment: string) => void

  // === Live Stream Actions ===
  /** Called when buyer joins a live stream */
  onJoinLive?: (streamId: string) => void
  /** Called when buyer sets reminder for scheduled stream */
  onSetReminder?: (streamId: string) => void
  /** Called when buyer sends chat in live stream */
  onLiveChat?: (streamId: string, message: string) => void

  // === Seller Actions ===
  /** Called when buyer views seller storefront */
  onViewSeller?: (sellerId: string) => void
  /** Called when buyer follows a seller */
  onFollowSeller?: (sellerId: string) => void

  // === Review Actions ===
  /** Called when buyer writes a review */
  onWriteReview?: (listingId: string, orderId: string) => void
  /** Called when buyer marks review as helpful */
  onMarkHelpful?: (reviewId: string) => void
}
