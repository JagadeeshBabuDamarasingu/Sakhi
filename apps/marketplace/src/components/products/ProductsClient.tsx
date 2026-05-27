"use client";

import { useState, useMemo } from "react";
import { products, categories } from "@/lib/mock-data";
import { FilterState } from "@/lib/types";
import ProductCard from "./ProductCard";

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  maxPrice: 10000,
  minRating: 0,
  inStockOnly: false,
  sortBy: "featured",
};

interface ProductsClientProps {
  initialCategory?: string;
}

export default function ProductsClient({ initialCategory }: ProductsClientProps) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...DEFAULT_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categorySlug));
    }
    result = result.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  function toggleCategory(slug: string) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.maxPrice < 10000 ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-base-content uppercase tracking-widest mb-3">
          Categories
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
              />
              <span className="flex-1 text-sm text-base-content/70 group-hover:text-base-content transition-colors">
                {cat.icon} {cat.name}
              </span>
              <span className="text-xs text-base-content/30">
                {cat.productCount}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold text-base-content uppercase tracking-widest mb-3">
          Max Price
        </h3>
        <input
          type="range"
          min={500}
          max={10000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="range range-sm range-primary w-full"
        />
        <div className="flex justify-between mt-1.5 text-xs text-base-content/45">
          <span>₹500</span>
          <span className="font-semibold text-primary">
            ₹{filters.maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold text-base-content uppercase tracking-widest mb-3">
          Min. Rating
        </h3>
        <div className="space-y-2">
          {[
            { label: "All Ratings", value: 0 },
            { label: "4.5+ ★", value: 4.5 },
            { label: "4.0+ ★", value: 4 },
            { label: "3.5+ ★", value: 3.5 },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                className="radio radio-sm radio-primary"
                checked={filters.minRating === opt.value}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, minRating: opt.value }))
                }
              />
              <span className="text-sm text-base-content/70">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                inStockOnly: e.target.checked,
              }))
            }
          />
          <span className="text-sm font-medium text-base-content">
            In Stock Only
          </span>
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => setFilters(DEFAULT_FILTERS)}
          className="btn btn-ghost btn-sm text-error w-full"
        >
          Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">All Products</h1>
        <p className="text-base-content/45 text-sm mt-1">
          {filtered.length} products from artisans across India
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-[calc(var(--header-h,5rem)+1rem)]">
            <FilterPanel />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setDrawerOpen(true)}
              className="btn btn-outline btn-sm gap-2 lg:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filters
              {hasActiveFilters && (
                <span className="badge badge-primary badge-xs" />
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-base-content/45 hidden sm:block">
                Sort:
              </span>
              <select
                className="select select-bordered select-sm text-sm"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterState["sortBy"],
                  }))
                }
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-base-content mb-1">
                No products match your filters
              </p>
              <p className="text-sm text-base-content/45 mb-6">
                Try adjusting or clearing your filters
              </p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="btn btn-primary btn-sm rounded-full"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-base-100 shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}
