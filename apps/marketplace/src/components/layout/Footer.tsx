"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-sm shrink-0">
                S
              </div>
              <span className="font-bold text-base">
                <span className="text-primary">Shakthi</span> Market
              </span>
            </div>
            <p className="text-sm text-neutral-content/60 leading-relaxed max-w-xs">
              Empowering women artisans across India by connecting their
              handcrafted treasures with the world.
            </p>
            <div className="flex gap-2 mt-5">
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-neutral-content/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-neutral-content/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-sm font-semibold text-neutral-content mb-4 uppercase tracking-wide">
              Quick Links
            </h6>
            <ul className="space-y-2.5 text-sm text-neutral-content/60">
              {[
                { label: "All Products", href: "/" },
                { label: "Clothing", href: "/?category=clothing" },
                { label: "Jewelry", href: "/?category=jewelry" },
                { label: "Handicrafts", href: "/?category=handicrafts" },
                { label: "Sell with Us", href: "#" },
                { label: "About Us", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="text-sm font-semibold text-neutral-content mb-4 uppercase tracking-wide">
              Stay in the Loop
            </h6>
            <p className="text-sm text-neutral-content/60 mb-4 leading-relaxed">
              Stories of artisans and new collections, delivered to your inbox.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 rounded-full text-sm bg-neutral-content/10 border border-neutral-content/20 text-neutral-content placeholder:text-neutral-content/30 outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="btn btn-sm btn-primary rounded-full shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-content/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-content/40">
          <p>© 2025 Shakthi Market. Made with care in India.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map(
              (t) => (
                <a
                  key={t}
                  href="#"
                  className="hover:text-neutral-content transition-colors"
                >
                  {t}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
