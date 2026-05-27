"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const full = Math.round(rating);
  const sz = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${sz} ${i <= full ? "text-secondary fill-secondary" : "text-base-300 fill-base-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [justAdded, setJustAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-base-content/40 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-base-content/60 truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-200">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount && (
              <div className="absolute top-4 left-4">
                <span className="badge badge-secondary badge-lg font-bold">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors shrink-0 ${
                    i === activeImage
                      ? "border-primary"
                      : "border-base-200 hover:border-base-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-base-content leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-base-content/45 mt-2">
              By{" "}
              <span className="font-medium text-base-content/65">
                {product.artisan}
              </span>{" "}
              · {product.location}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2.5">
            <StarRating rating={product.rating} size="md" />
            <span className="font-semibold text-base-content">
              {product.rating}
            </span>
            <span className="text-sm text-base-content/40">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-base-content">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-base-content/35 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {discount && (
              <span className="badge badge-success font-medium">
                {discount}% off
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-success font-medium">
                  In Stock
                </span>
                {product.stock < 10 && (
                  <span className="text-sm text-warning">
                    · Only {product.stock} left
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-error" />
                <span className="text-sm text-error font-medium">
                  Out of Stock
                </span>
              </>
            )}
          </div>

          <p className="text-base-content/65 leading-relaxed text-sm">
            {product.shortDescription}
          </p>

          {/* Qty + CTA */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-base-300 rounded-full overflow-hidden">
              <button
                className="px-3 py-2 text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors disabled:opacity-30"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-4 text-sm font-semibold min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                className="px-3 py-2 text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors disabled:opacity-30"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`btn flex-1 rounded-full font-semibold ${
                justAdded ? "btn-success" : "btn-primary"
              }`}
            >
              {justAdded ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>

          <button className="btn btn-outline btn-block rounded-full border-base-300">
            ♡ Add to Wishlist
          </button>

          {/* Trust badges */}
          <div className="flex gap-4 pt-2 border-t border-base-200">
            {[
              { icon: "🔒", label: "Secure Payment" },
              { icon: "🚚", label: "Free Delivery ₹999+" },
              { icon: "↩️", label: "Easy Returns" },
            ].map((b) => (
              <div key={b.label} className="text-center flex-1">
                <p className="text-xl">{b.icon}</p>
                <p className="text-[10px] text-base-content/40 mt-0.5">
                  {b.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex border-b border-base-200 gap-0">
          {(["description", "details", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/50 hover:text-base-content"
              }`}
            >
              {tab}
              {tab === "reviews" && ` (${product.reviews.length})`}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-2xl">
          {activeTab === "description" && (
            <p className="text-base-content/70 leading-relaxed">
              {product.description}
            </p>
          )}

          {activeTab === "details" && (
            <div className="space-y-3">
              {Object.entries(product.details)
                .filter(([, v]) => v)
                .map(([key, value]) => (
                  <div key={key} className="flex gap-4 py-2 border-b border-base-200 last:border-0">
                    <span className="text-sm font-medium text-base-content/45 capitalize min-w-40">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm text-base-content">{value}</span>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-5">
              {product.reviews.length === 0 ? (
                <p className="text-base-content/45 text-sm">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="card border border-base-200 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="avatar shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-base-200">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm">
                              {review.author}
                            </p>
                            {review.verified && (
                              <span className="badge badge-success badge-xs mt-0.5">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-base-content/35 shrink-0">
                            {new Date(review.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="mt-1.5 mb-2">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="font-semibold text-sm mb-1">
                          {review.title}
                        </p>
                        <p className="text-sm text-base-content/60">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
