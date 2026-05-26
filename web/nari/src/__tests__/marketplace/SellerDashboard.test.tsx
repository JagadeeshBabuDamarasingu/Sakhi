import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { SellerDashboard } from '@/components/marketplace/SellerDashboard'
import type { AnalyticsSummary, Listing } from '@/components/marketplace/types'
import { getMarketplaceDashboardData } from '@/lib/marketplace-store'

const makeRevenueDays = () =>
  Array.from({ length: 30 }, (_, index) => ({
    date: new Date(2026, 4, index + 1).toISOString(),
    revenue: 2000 + index * 100,
  }))

const makeProps = () => {
  const data = getMarketplaceDashboardData()
  const analyticsSummary: AnalyticsSummary = {
    ...data.analyticsSummary,
    overview: {
      ...data.analyticsSummary.overview,
      totalRevenue: 125000,
      totalOrders: 48,
      revenueChange: 12.5,
      ordersChange: -3.2,
    },
    trafficSources: [
      { source: 'ONDC Network', percentage: 45 },
      { source: 'Direct', percentage: 30 },
      { source: 'Social Media', percentage: 25 },
    ],
    revenueByDay: makeRevenueDays(),
  }

  return {
    sellerProfile: data.sellerProfile,
    analyticsSummary,
    recentOrders: data.recentOrders,
    lowStockListings: data.lowStockListings,
  }
}

describe('SellerDashboard marketplace flows', () => {
  it('shows analytics using Indian number formatting and 30 revenue data points', () => {
    render(<SellerDashboard {...makeProps()} />)

    expect(screen.getByText('₹1,25,000')).toBeInTheDocument()
    expect(screen.getByText('48')).toBeInTheDocument()
    expect(screen.getByText('12.5%')).toBeInTheDocument()
    expect(screen.getByText('3.2%')).toBeInTheDocument()
    expect(screen.getAllByTestId('revenue-bar')).toHaveLength(30)
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('ONDC Network')).toBeInTheDocument()
  })

  it('wires create listing, go live, and export actions', () => {
    const onCreateListing = vi.fn()
    const onGoLive = vi.fn()
    const onExportAnalytics = vi.fn()

    render(
      <SellerDashboard
        {...makeProps()}
        onCreateListing={onCreateListing}
        onGoLive={onGoLive}
        onExportAnalytics={onExportAnalytics}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /create listing/i }))
    fireEvent.click(screen.getByRole('button', { name: /go live/i }))
    fireEvent.click(screen.getByRole('button', { name: /export/i }))

    expect(onCreateListing).toHaveBeenCalledOnce()
    expect(onGoLive).toHaveBeenCalledOnce()
    expect(onExportAnalytics).toHaveBeenCalledOnce()
  })

  it('passes the full AI insight object to the insight callback', () => {
    const onInsightAction = vi.fn()
    const props = makeProps()

    render(<SellerDashboard {...props} onInsightAction={onInsightAction} />)

    expect(screen.getByText('High demand for sarees this week')).toBeInTheDocument()
    expect(screen.getByText('Low stock alert')).toBeInTheDocument()
    expect(screen.getByText('Price optimization')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /promote sarees/i }))
    expect(onInsightAction).toHaveBeenCalledWith(props.analyticsSummary.aiInsights[0])
  })

  it('wires recent order and view-all order actions', () => {
    const onViewOrder = vi.fn()
    const onViewAllOrders = vi.fn()
    const props = makeProps()

    render(
      <SellerDashboard
        {...props}
        onViewOrder={onViewOrder}
        onViewAllOrders={onViewAllOrders}
      />
    )

    expect(screen.getAllByLabelText(/view order/i)).toHaveLength(props.recentOrders.length)
    fireEvent.click(screen.getByLabelText(`View order ${props.recentOrders[0].orderNumber}`))
    fireEvent.click(screen.getByRole('button', { name: /view all seller orders/i }))

    expect(onViewOrder).toHaveBeenCalledWith(props.recentOrders[0].id)
    expect(onViewAllOrders).toHaveBeenCalledOnce()
  })

  it('renders low stock listings as clickable chips', () => {
    const onViewListing = vi.fn()
    const props = makeProps()
    const lowStockListings: Listing[] = [
      props.lowStockListings[0],
      {
        ...props.lowStockListings[0],
        id: 'listing-low-002',
        title: 'Handmade Potli Bags',
      },
    ]

    render(
      <SellerDashboard
        {...props}
        lowStockListings={lowStockListings}
        onViewListing={onViewListing}
      />
    )

    expect(screen.getByText('2 products are running low on inventory')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /handmade potli bags/i }))
    expect(onViewListing).toHaveBeenCalledWith('listing-low-002')
  })

  it('handles no insights, no recent orders, and no low stock listings', () => {
    const props = makeProps()

    render(
      <SellerDashboard
        {...props}
        analyticsSummary={{ ...props.analyticsSummary, aiInsights: [] }}
        recentOrders={[]}
        lowStockListings={[]}
      />
    )

    expect(screen.queryByText('AI Insights')).not.toBeInTheDocument()
    expect(screen.getByText('No orders yet')).toBeInTheDocument()
    expect(screen.getByText('Your first order will appear here')).toBeInTheDocument()
    expect(screen.queryByText(/running low on inventory/i)).not.toBeInTheDocument()
  })

  it('wires top product listing navigation', () => {
    const onViewListing = vi.fn()
    const onViewAllListings = vi.fn()
    const props = makeProps()

    render(
      <SellerDashboard
        {...props}
        onViewListing={onViewListing}
        onViewAllListings={onViewAllListings}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /hand block printed cotton saree/i }))
    const topProducts = screen.getByText('Top Products').closest('div')?.parentElement
    expect(topProducts).not.toBeNull()
    fireEvent.click(within(topProducts as HTMLElement).getByRole('button', { name: /view all/i }))

    expect(onViewListing).toHaveBeenCalledWith('listing-001')
    expect(onViewAllListings).toHaveBeenCalledOnce()
  })
})
