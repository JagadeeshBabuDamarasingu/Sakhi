"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const shipping = total > 0 ? (total >= 999 ? 0 : 99) : 0;
  const orderTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <p className="text-7xl mb-6">🛍️</p>
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Your cart is empty
        </h1>
        <p className="text-base-content/45 text-sm mb-10 leading-relaxed">
          Explore our artisan collection and find something beautiful.
        </p>
        <Link
          href="/products"
          className="btn btn-primary btn-lg rounded-full px-10"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-base-content mb-8">
        Shopping Cart
        <span className="text-base-content/40 font-normal text-xl ml-3">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="card bg-base-100 border border-base-200 overflow-hidden"
            >
              <div className="flex items-stretch gap-0">
                {/* Image */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-4 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-semibold text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-base-content/40 mt-0.5">
                        {item.product.artisan}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-base-content/30 hover:text-error hover:bg-error/10 transition-colors"
                      aria-label="Remove"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center border border-base-300 rounded-full overflow-hidden">
                      <button
                        className="px-2.5 py-1.5 text-sm text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2.5 py-1.5 text-sm text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors disabled:opacity-30"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-base-content">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-base-content/35">
                        ₹{item.product.price.toLocaleString("en-IN")} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 border border-base-200 sticky top-[calc(var(--header-h,5rem)+1rem)]">
            <div className="card-body p-6 gap-4">
              <h2 className="font-bold text-lg text-base-content">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/55">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/55">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success font-medium">Free</span>
                  ) : (
                    <span className="font-medium">₹{shipping}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-base-content/40 bg-base-200 rounded-lg px-3 py-2">
                    Add ₹{(999 - total).toLocaleString("en-IN")} more for free
                    shipping
                  </p>
                )}
                <div className="pt-3 border-t border-base-200 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{orderTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button className="btn btn-primary btn-block rounded-full font-semibold mt-1">
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="btn btn-ghost btn-block btn-sm text-base-content/50"
              >
                Continue Shopping
              </Link>

              {/* Trust */}
              <div className="flex justify-around pt-3 border-t border-base-200">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "🚚", label: "Fast Delivery" },
                  { icon: "↩️", label: "Easy Returns" },
                ].map((b) => (
                  <div key={b.label} className="text-center">
                    <p className="text-xl">{b.icon}</p>
                    <p className="text-[10px] text-base-content/35 mt-0.5">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
