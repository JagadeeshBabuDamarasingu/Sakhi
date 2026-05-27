"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= full ? "text-secondary fill-secondary" : "text-base-300 fill-base-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
  }

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="card bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 h-full group overflow-hidden">
        {/* Image */}
        <figure className="relative aspect-square overflow-hidden bg-base-200">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          {discount && (
            <div className="absolute top-2 left-2">
              <span className="badge badge-secondary text-xs font-bold px-2">
                {discount}% OFF
              </span>
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-base-100/90 hover:bg-base-100 flex items-center justify-center shadow-sm transition-colors"
            aria-label="Wishlist"
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "text-error fill-error" : "text-base-content/40"}`}
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </figure>

        <div className="card-body p-4 gap-1.5">
          <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest">
            {product.category}
          </p>

          <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-base-content">
            {product.name}
          </h3>

          <p className="text-xs text-base-content/40 truncate">
            {product.artisan} · {product.location}
          </p>

          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-base-content/40">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base-content">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-base-content/35 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`btn btn-xs rounded-full px-3 transition-all ${
                justAdded
                  ? "btn-success"
                  : product.stock === 0
                    ? "btn-disabled"
                    : "btn-primary"
              }`}
            >
              {justAdded ? "✓ Added" : product.stock === 0 ? "Sold Out" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
