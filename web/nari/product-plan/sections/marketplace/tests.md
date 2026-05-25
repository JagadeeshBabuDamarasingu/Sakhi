# Test Instructions: Marketplace (Seller Dashboard)

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Marketplace seller dashboard displays analytics, AI insights, order management, and quick actions. Key flows: viewing analytics with real data, acting on AI insights, managing orders, and handling low stock alerts.

---

## User Flow Tests

### Flow 1: View Analytics Dashboard

**Setup:**
- `analyticsSummary.overview.totalRevenue: 125000`
- `analyticsSummary.overview.totalOrders: 48`
- `analyticsSummary.overview.revenueChange: +12.5` (positive)
- `analyticsSummary.overview.ordersChange: -3.2` (negative)

**Expected Results:**
- [ ] Total Revenue stat card shows "₹1,25,000" (Indian number format)
- [ ] Orders stat card shows "48"
- [ ] Revenue change shows positive indicator (green, upward arrow or +12.5%)
- [ ] Orders change shows negative indicator (red, downward arrow or -3.2%)
- [ ] RevenueChart renders with 30 data points
- [ ] TrafficSourcesChart renders showing sources and percentages

---

### Flow 2: Create a Listing

**Steps:**
1. User sees QuickActions bar with "Create Listing" button
2. User clicks "Create Listing"

**Expected Results:**
- [ ] `onCreateListing` is called
- [ ] (Your implementation opens the listing creation form)

---

### Flow 3: Go Live

**Steps:**
1. User sees "Go Live" button in QuickActions
2. User clicks "Go Live"

**Expected Results:**
- [ ] `onGoLive` is called

---

### Flow 4: Act on AI Insight

**Setup:**
- `analyticsSummary.aiInsights` has 3 insights with types: 'opportunity', 'alert', 'suggestion'

**Steps:**
1. User sees 3 AI Insight cards in the AI Insights panel
2. User clicks the action button on an insight card

**Expected Results:**
- [ ] 3 AIInsightCard components render with titles and descriptions
- [ ] Clicking action button calls `onInsightAction` with the full insight object
- [ ] Cards are visually differentiated by type (opportunity, alert, suggestion)

---

### Flow 5: View and Manage Orders

**Setup:**
- `recentOrders` has 5 recent orders with different statuses

**Steps:**
1. User sees RecentOrdersTable with 5 order rows
2. User clicks on an order row or view button
3. User clicks "View all orders"

**Expected Results:**
- [ ] 5 order rows render with order number, buyer name, total, and status
- [ ] Clicking an order calls `onViewOrder` with the correct order id
- [ ] "View all" link calls `onViewAllOrders`
- [ ] Order status is color-coded (placed/confirmed = neutral, shipped = blue, delivered = green, cancelled = red)

---

### Flow 6: Low Stock Alert

**Setup:**
- `lowStockListings` has 2 listings with low inventory

**Expected Results:**
- [ ] Amber warning banner renders below RecentOrdersTable
- [ ] Banner says "2 products are running low on inventory"
- [ ] Both listing names appear as clickable chips
- [ ] Clicking a listing chip calls `onViewListing` with the listing id

---

### Flow 7: Export Analytics

**Steps:**
1. User clicks "Export" button in the header

**Expected Results:**
- [ ] `onExportAnalytics` is called

---

## Empty State Tests

### No AI Insights

**Setup:** `analyticsSummary.aiInsights: []`

**Expected Results:**
- [ ] AI Insights panel does NOT render
- [ ] No empty section or placeholder visible

### No Recent Orders

**Setup:** `recentOrders: []`

**Expected Results:**
- [ ] RecentOrdersTable renders with empty state message (e.g., "No orders yet")
- [ ] "View all" link is still accessible

### No Low Stock Listings

**Setup:** `lowStockListings: []`

**Expected Results:**
- [ ] Low stock warning banner does NOT render
- [ ] No blank space below RecentOrdersTable

---

## Component Interaction Tests

### StatCard

- [ ] Renders label and value correctly
- [ ] Shows `change` value as positive (green) when > 0
- [ ] Shows `change` value as negative (red) when < 0
- [ ] Shows neutral state when `change === 0`

### TopProductsTable

- [ ] Renders product titles and revenue figures
- [ ] Clicking a product row calls `onViewListing` with listing id
- [ ] "View all" link calls `onViewAllListings`

### KeywordRankingsTable

- [ ] Shows keyword, rank number, and change indicator
- [ ] Rank improvement shows upward arrow (green)
- [ ] Rank decline shows downward arrow (red)
- [ ] No change shows neutral indicator

---

## Edge Cases

- [ ] Store name with special characters renders correctly in header
- [ ] Revenue of ₹0 shows "₹0" not blank
- [ ] `revenueChange: 0` shows neutral (neither positive nor negative indicator)
- [ ] More than 3 low-stock listings shows the first 3 chips + "+N more" label
- [ ] Revenue chart handles `revenueByDay` with missing dates gracefully

---

## Accessibility Checks

- [ ] "Export" button has descriptive aria-label
- [ ] Order status badges have sufficient color contrast
- [ ] Tables have proper `thead` and column headers
- [ ] AI Insight action buttons have descriptive text

---

## Sample Test Data

```typescript
const mockSellerProfile = {
  id: 'seller-001',
  userId: 'user-001',
  storeName: 'Priya\'s Handcraft Studio',
  tagline: 'Authentic Indian handmade crafts',
  bio: 'Creating beautiful Rajasthani art for 10 years',
  profileImage: '',
  coverImage: '',
  skills: ['Mehndi Art', 'Block Printing'],
  location: { city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
  socialLinks: { instagram: null, whatsapp: null, youtube: null },
  brandColors: { primary: '#e11d48', secondary: '#f59e0b' },
  badges: ['Top Seller'],
  rating: 4.7,
  totalReviews: 234,
  totalSales: 1250000,
  memberSince: '2025-01-15',
  responseTime: '< 1 hour',
  shippingPolicy: 'Ships in 2-3 days',
  returnPolicy: '7-day returns',
  ondcRegistered: true,
  ondcSellerId: 'ONDC-JAI-001',
}

const mockAnalyticsSummary = {
  period: 'last-30-days',
  overview: {
    totalViews: 8500,
    viewsChange: 15.2,
    totalOrders: 48,
    ordersChange: -3.2,
    totalRevenue: 125000,
    revenueChange: 12.5,
    conversionRate: 2.8,
    conversionChange: 0.5,
  },
  topProducts: [
    { listingId: 'listing-001', title: 'Rajasthani Block Print Dupatta', sales: 45, revenue: 67500 },
  ],
  trafficSources: [
    { source: 'ONDC', percentage: 45 },
    { source: 'Direct', percentage: 30 },
    { source: 'Social', percentage: 25 },
  ],
  revenueByDay: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2026, 4, i + 1).toISOString(),
    revenue: Math.floor(Math.random() * 8000) + 2000,
  })),
  aiInsights: [
    {
      type: 'opportunity' as const,
      title: 'Add 3 more products',
      description: 'Sellers with 10+ products earn 40% more on average',
      action: 'Create Listing',
    },
  ],
  keywordRankings: [
    { keyword: 'block print saree', rank: 3, change: 2, searchVolume: 12000 },
  ],
}

// Empty states
const emptyOrders = []
const emptyInsights = []
const emptyLowStockListings = []
```
