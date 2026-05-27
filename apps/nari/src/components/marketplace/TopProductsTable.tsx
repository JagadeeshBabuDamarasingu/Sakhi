import type { TopProduct } from './types'

interface TopProductsTableProps {
  products: TopProduct[]
  onViewProduct?: (listingId: string) => void
  onViewAll?: () => void
}

export function TopProductsTable({ products, onViewProduct, onViewAll }: TopProductsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const maxRevenue = Math.max(...products.map((p) => p.revenue), 0)

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-base-300">
        <div>
          <h3 className="text-lg font-semibold text-base-content">Top Products</h3>
          <p className="text-sm text-base-content/60 mt-0.5">Best performers this month</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="divide-y divide-base-300">
        {products.map((product, index) => {
          const progressWidth = maxRevenue === 0 ? 0 : (product.revenue / maxRevenue) * 100
          const isTop = index === 0

          return (
            <button
              key={product.listingId}
              onClick={() => onViewProduct?.(product.listingId)}
              className="w-full flex items-center gap-4 p-4 hover:bg-base-200 transition-colors text-left group"
            >
              {/* Rank Badge */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isTop
                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm'
                    : 'bg-base-200 text-base-content/70'
                }`}
              >
                {index + 1}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-base-content truncate group-hover:text-primary transition-colors">
                  {product.title}
                </p>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="text-xs text-base-content/60">
                    {product.sales} sales
                  </span>
                  {/* Mini progress bar */}
                  <div className="flex-1 h-1.5 bg-base-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-primary/80 to-secondary/80'
                          : 'bg-base-300'
                      }`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-base-content">
                  {formatCurrency(product.revenue)}
                </p>
                <p className="text-xs text-base-content/60">revenue</p>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}
