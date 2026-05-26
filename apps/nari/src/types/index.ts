export interface User {
  id: string
  name: string
  avatarUrl: string | null
  preferredLanguage: string
  city: string
  isFirstTime: boolean
  onboardingCompleted: boolean
  memberSince: string
}

export interface Skill {
  id: string
  name: string
  category: string
  categoryId: string
  description: string
  validationStatus: 'verified' | 'pending' | 'unverified' | 'auto-verified'
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  earningPotential: {
    min: number
    max: number
    currency: string
    period: 'monthly' | 'weekly' | 'daily'
  }
  marketDemand: 'low' | 'medium' | 'high' | 'very-high'
  addedAt: string
  verifiedAt: string | null
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: number
  format: 'video' | 'interactive' | 'mixed'
  level: 'beginner' | 'intermediate' | 'advanced'
  language: string
  isMandatory: boolean
  isTrending: boolean
  thumbnailUrl: string
  instructorName: string
  rating: number
  enrolledCount: number
}

export interface Listing {
  id: string
  sellerId: string
  type: 'product' | 'service' | 'digital'
  title: string
  description: string
  category: string
  images: string[]
  price: number
  currency: string
  status: 'active' | 'draft' | 'out_of_stock' | 'archived'
  rating: number
  reviewCount: number
  soldCount: number
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  sellerId: string
  buyerName: string
  items: Array<{
    listingId: string
    title: string
    quantity: number
    price: number
    image: string
  }>
  total: number
  currency: string
  paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'COD' | 'BNPL'
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Loan {
  id: string
  type: 'micro-loan' | 'course-financing' | 'business-expansion'
  status: 'active' | 'closed' | 'overdue' | 'pending'
  amount: number
  outstandingBalance: number
  emiAmount: number
  totalEmis: number
  emisPaid: number
  nextEmiDate: string | null
  repaymentStatus: 'on-track' | 'due-soon' | 'overdue' | 'closed'
  lenderName: string
}
