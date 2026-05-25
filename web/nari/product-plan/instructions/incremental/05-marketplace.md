# Milestone 5: Marketplace

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Marketplace seller dashboard — an analytics and commerce management hub connected to ONDC.

## Overview

The Marketplace seller dashboard gives women entrepreneurs full visibility into their store performance. It shows revenue, order, views, and conversion metrics with 30-day charts, AI-powered insights with actionable recommendations, top product rankings, keyword tracking, and recent order management. The screen design provided covers the seller experience inside the app shell.

**Key Functionality:**
- Analytics overview with 4 key metrics and change indicators (30-day period)
- Revenue line/bar chart and traffic sources breakdown
- AI Insights panel with opportunity alerts and optimization suggestions
- Top products table ranked by revenue
- Keyword rankings with trend arrows (for ONDC/search visibility)
- Recent orders table with status and quick actions
- Low stock alert banner when inventory is running low
- Quick actions: Create Listing and Go Live buttons
- Export analytics to CSV/PDF

## Recommended Approach: Test-Driven Development

See `product-plan/sections/marketplace/tests.md` for detailed test-writing instructions including:
- Analytics data display with Indian number formatting
- AI insight action callbacks
- Order management interactions
- Low stock alert rendering
- Empty states (no insights, no orders, no low stock)

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/marketplace/components/`:

- `SellerDashboard` — Main analytics and management dashboard
- `StatCard` — Individual metric card with change percentage
- `RevenueChart` — 30-day revenue visualization
- `TrafficSourcesChart` — Traffic breakdown (ONDC, Direct, Social, etc.)
- `AIInsightCard` — Individual AI recommendation card
- `TopProductsTable` — Top revenue products
- `KeywordRankingsTable` — Keyword/search ranking tracker
- `RecentOrdersTable` — Latest orders with status
- `QuickActions` — Create Listing + Go Live CTA bar

### Data Layer

The `SellerDashboard` component expects (see `types.ts`):

- `sellerProfile` — Store name, bio, location, ONDC registration status
- `analyticsSummary` — Metrics overview, top products, traffic sources, revenue by day, AI insights, keyword rankings
- `recentOrders` — Latest 5-10 orders
- `lowStockListings` — Listings where `inventory.quantity <= inventory.lowStockThreshold`

### API Endpoints to Build

```
GET  /api/seller/profile            → Seller profile data
GET  /api/seller/analytics          → Analytics summary (30-day default)
GET  /api/seller/orders             → Order list (paginated)
GET  /api/seller/listings           → Listing list with inventory
GET  /api/seller/listings/low-stock → Listings below stock threshold
POST /api/seller/listings           → Create new listing
POST /api/seller/live               → Start live session
GET  /api/seller/analytics/export   → Export analytics data
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onViewOrder(orderId)` | Navigate to order detail page |
| `onViewListing(listingId)` | Navigate to listing edit page |
| `onCreateListing()` | Open listing creation form |
| `onGoLive()` | Start live selling session |
| `onViewAllOrders()` | Navigate to full orders list |
| `onViewAllListings()` | Navigate to full listings page |
| `onInsightAction(insight)` | Execute the AI insight action (e.g., open listing form) |
| `onExportAnalytics()` | Download analytics CSV/PDF |

### ONDC Integration

The Marketplace connects to India's Open Network for Digital Commerce (ONDC):
- Listings sync bidirectionally with the ONDC network
- Orders can come from ONDC buyers (not just direct)
- `sellerProfile.ondcRegistered` and `ondcSellerId` track ONDC status
- Discuss ONDC integration details with stakeholders — this may be a Phase 2 feature

### Indian Currency Formatting

All currency values must be formatted in Indian style:
- Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`
- Example: 125000 → "₹1,25,000" (not "₹125,000")

### Empty States

- **No AI insights:** AI Insights panel doesn't render
- **No recent orders:** RecentOrdersTable shows "No orders yet — your first order will appear here"
- **No low stock listings:** Low stock alert doesn't render

## Files to Reference

- `product-plan/sections/marketplace/README.md` — Feature overview
- `product-plan/sections/marketplace/tests.md` — Test-writing instructions
- `product-plan/sections/marketplace/components/` — React components
- `product-plan/sections/marketplace/types.ts` — TypeScript interfaces
- `product-plan/sections/marketplace/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Store Performance

1. Seller opens the Marketplace section
2. Dashboard loads with 30-day analytics
3. Seller sees revenue chart with daily data points
4. Seller sees traffic breakdown: 45% ONDC, 30% Direct, 25% Social
5. **Outcome:** At-a-glance understanding of store health

### Flow 2: Act on AI Insight

1. Seller sees an opportunity insight: "Add 3 more products — sellers with 10+ earn 40% more"
2. Seller clicks the insight's action button "Create Listing"
3. **Outcome:** `onCreateListing` is called; listing creation form opens

### Flow 3: Manage a Recent Order

1. Seller sees an order in "placed" status in the recent orders table
2. Seller clicks the order row to view details
3. Seller updates status to "confirmed"
4. **Outcome:** Order status updates; buyer receives notification

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Analytics dashboard renders with real data
- [ ] Revenue and traffic charts display correctly
- [ ] AI insights render with working action callbacks
- [ ] Orders table shows with correct status styling
- [ ] Low stock alert renders when applicable; hidden when not
- [ ] Create Listing and Go Live buttons work
- [ ] Export analytics triggers download
- [ ] Indian currency formatting (₹1,25,000 style) applied throughout
- [ ] Responsive on mobile
