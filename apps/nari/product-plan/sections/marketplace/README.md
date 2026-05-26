# Marketplace

## Overview

Marketplace is a dual-sided commerce platform connected to ONDC. For Shakti sellers, the provided dashboard gives listing management, AI-powered insights, and a full analytics suite with revenue charts, keyword research, and competitor analysis. The screen design focuses on the seller dashboard experience inside the app shell.

## User Flows (Seller)

- **View analytics** — See revenue, orders, views, and conversion metrics with 30-day charts
- **AI insights** — Get demand forecasting, pricing recommendations, and optimization suggestions
- **Manage orders** — View recent orders, update status, handle fulfillment
- **Create listing** — Start the listing creation flow with AI-generated descriptions
- **Go live** — Start a live selling session
- **Export analytics** — Download analytics report

## Design Decisions

- Decorative gradient header creates depth behind the analytics content
- Stats grid is 2×2 on mobile, 4×1 on desktop
- Revenue chart and traffic sources are side-by-side on desktop (lg:col-span-2 + 1)
- AI Insights panel uses a rose-to-amber gradient icon as a visual anchor
- Low stock alert renders below recent orders as an amber warning banner
- Tables (TopProducts, KeywordRankings, RecentOrders) each have "View all" callbacks

## Data Used

**Entities:** SellerProfile, AnalyticsSummary (overview, topProducts, trafficSources, revenueByDay, aiInsights, keywordRankings), Order, Listing

## Components Provided

- `SellerDashboard` — Main analytics and management dashboard
- `StatCard` — Individual metric card with change indicator
- `RevenueChart` — 30-day revenue line/bar chart
- `TrafficSourcesChart` — Traffic source breakdown (donut/pie)
- `AIInsightCard` — Individual AI recommendation card with action CTA
- `TopProductsTable` — Top products ranked by revenue
- `KeywordRankingsTable` — SEO/ONDC keyword rankings with trend arrows
- `RecentOrdersTable` — Latest orders with status and amount
- `QuickActions` — Create Listing and Go Live buttons

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewOrder(orderId)` | View order detail page |
| `onViewListing(listingId)` | View or edit a listing |
| `onCreateListing()` | Open listing creation form |
| `onGoLive()` | Start live selling session |
| `onViewAllOrders()` | Navigate to full orders list |
| `onViewAllListings()` | Navigate to full listings page |
| `onInsightAction(insight)` | Handle AI insight action button |
| `onExportAnalytics()` | Export analytics to CSV/PDF |
