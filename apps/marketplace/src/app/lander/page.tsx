import Link from "next/link";
import { featuredProducts, categories } from "@/lib/mock-data";
import ProductCard from "@/components/products/ProductCard";

export default function LanderPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-base-100 bg-dot-grid">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-7 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              AI-Powered Artisan Discovery
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-base-content mb-6 leading-[1.05] animate-fade-up-1">
              Discover{" "}
              <span className="text-primary">Authentic</span>
              <br />
              Indian Artisan
              <br />
              Products
            </h1>

            <p className="text-lg text-base-content/55 mb-10 leading-relaxed max-w-lg animate-fade-up-2">
              From Banarasi silks to Dokra brass — handcrafted by skilled
              artisans across India. Shop with purpose, empower the makers.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up-3">
              <Link
                href="/"
                className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-shadow"
              >
                Shop Now
              </Link>
              <Link
                href="#"
                className="btn btn-outline btn-lg rounded-full px-8 border-base-300 hover:border-primary"
              >
                Sell with Us
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-base-300 animate-fade-up-3">
              {[
                { value: "2,400+", label: "Products" },
                { value: "850+", label: "Artisans" },
                { value: "28", label: "States" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-base-content">
                    {stat.value}
                  </p>
                  <p className="text-sm text-base-content/45 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                Shop by Category
              </h2>
              <p className="text-sm text-base-content/45 mt-1">
                Browse our curated collections
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.slug}`}
                className="group card bg-base-100 border border-base-200 hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <div className="card-body items-center text-center py-7 px-4">
                  <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </span>
                  <h3 className="font-semibold text-sm text-base-content">
                    {category.name}
                  </h3>
                  <p className="text-xs text-base-content/35 mt-0.5">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16 bg-base-200 bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                Featured Products
              </h2>
              <p className="text-sm text-base-content/45 mt-1">
                Handpicked by our curators
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Shakthi ── */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-2">
              Why Shakthi Market?
            </h2>
            <p className="text-base-content/45 text-sm max-w-sm mx-auto leading-relaxed">
              More than a marketplace — a movement to preserve India's artisan
              heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                ),
                bg: "bg-primary/10",
                color: "text-primary",
                title: "100% Authentic",
                body: "Every product is verified and sourced directly from artisans. Certificates of authenticity for unique pieces.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                ),
                bg: "bg-secondary/20",
                color: "text-secondary-content",
                title: "Empowering Women Artisans",
                body: "70% of our artisans are women. Fair prices, direct payments, no middlemen. Your purchase transforms lives.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                ),
                bg: "bg-accent/10",
                color: "text-accent",
                title: "AI-Powered Discovery",
                body: "Tell our AI what you're looking for in plain language. It understands context, occasion, budget, and style.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card bg-base-100 border border-base-200 p-8 text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-5`}
                >
                  <svg
                    className={`w-7 h-7 ${item.color}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-base-content mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/55 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artisan CTA ── */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Are You an Artisan?</h2>
          <p className="text-primary-content/75 mb-10 leading-relaxed">
            Join 850+ artisans already selling on Shakthi Market. We handle
            logistics, payments, and marketing — you focus on your craft.
          </p>
          <Link
            href="#"
            className="btn btn-lg rounded-full px-10 bg-primary-content text-primary hover:bg-primary-content/90 font-semibold"
          >
            Start Selling Today
          </Link>
        </div>
      </section>
    </>
  );
}
