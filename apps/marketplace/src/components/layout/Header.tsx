"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navCategories = [
  { label: "All Products", href: "/" },
  { label: "Clothing", href: "/?category=clothing" },
  { label: "Jewelry", href: "/?category=jewelry" },
  { label: "Home & Kitchen", href: "/?category=home-kitchen" },
  { label: "Beauty", href: "/?category=beauty" },
  { label: "Handicrafts", href: "/?category=handicrafts" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm shadow-sm border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 gap-2 min-h-16">
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-sm shrink-0">
              S
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:block">
              <span className="text-primary">Shakthi</span>
              <span className="text-base-content"> Market</span>
            </span>
          </Link>
        </div>

        {/* Search — desktop */}
        <div className="navbar-center flex-1 max-w-lg px-4 hidden md:flex">
          <div className="flex items-center gap-2 w-full bg-base-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
            <svg
              className="w-4 h-4 text-base-content/40 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search artisan products..."
              className="grow bg-transparent outline-none text-sm text-base-content placeholder:text-base-content/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              title="Voice search"
              className="shrink-0 text-base-content/40 hover:text-primary transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="navbar-end gap-1">
          {/* Mobile search icon */}
          <button className="btn btn-ghost btn-sm btn-circle md:hidden">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart */}
          <Link href="/cart" className="indicator btn btn-ghost btn-sm btn-circle">
            {itemCount > 0 && (
              <span className="indicator-item badge badge-primary badge-xs text-[10px] font-bold">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 16H4L5 9z"
              />
            </svg>
          </Link>

          {/* User dropdown */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <div className="w-7 h-7 rounded-full bg-base-300 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-base-content/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm z-[1] mt-3 w-48 rounded-box bg-base-100 shadow-lg border border-base-200 p-2 gap-0.5"
            >
              <li>
                <a className="text-sm">My Account</a>
              </li>
              <li>
                <a className="text-sm">My Orders</a>
              </li>
              <li>
                <a className="text-sm">Wishlist</a>
              </li>
              <div className="divider my-0.5" />
              <li>
                <a className="text-sm font-medium text-primary">Sign In</a>
              </li>
            </ul>
          </div>

          {/* Mobile nav dropdown */}
          <div className="dropdown dropdown-end md:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm z-[1] mt-3 w-48 rounded-box bg-base-100 shadow-lg border border-base-200 p-2"
            >
              {navCategories.map((cat) => (
                <li key={cat.label}>
                  <Link href={cat.href} className="text-sm">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Category nav — desktop */}
      <nav className="border-t border-base-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-1 py-2 overflow-x-auto">
            {navCategories.map((cat) => (
              <li key={cat.label}>
                <Link
                  href={cat.href}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-base-content/70 hover:bg-primary hover:text-primary-content transition-colors whitespace-nowrap"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
