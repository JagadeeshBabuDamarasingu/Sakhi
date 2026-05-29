'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineStar,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
  HiOutlineTag,
  HiOutlineCheckBadge,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineShare,
} from 'react-icons/hi2'
import type { SellerProfile, Listing } from '@/components/marketplace/types'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <HiOutlineStar
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-base-content/30'}`}
        />
      ))}
    </div>
  )
}

function ListingCard({ listing }: { listing: Listing }) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = listing.images.slice(0, 5)
  const hasDiscount = listing.compareAtPrice && listing.compareAtPrice > listing.price
  const discountPct = hasDiscount
    ? Math.round(((listing.compareAtPrice! - listing.price) / listing.compareAtPrice!) * 100)
    : 0
  const totalMedia = images.length + (listing.video ? 1 : 0)

  return (
    <div className="bg-base-100 rounded-2xl overflow-hidden ring-1 ring-base-300 hover:shadow-md hover:ring-stone-200 dark:hover:ring-stone-700 transition-all group cursor-pointer">
      <div className="relative aspect-square bg-base-200 overflow-hidden">
        {images[imgIndex] ? (
          <img
            src={images[imgIndex]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <HiOutlineTag className="w-8 h-8 text-base-content/30" />
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discountPct}% off
          </span>
        )}
        {listing.featured && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/90/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <HiOutlineHeart className="w-4 h-4 text-rose-500" />
        </button>
        {/* Dot indicators for multiple images/video */}
        {totalMedia > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  imgIndex === i ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
            {listing.video && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            )}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-base-content/40 mb-0.5">{listing.category}</p>
        <p className="text-sm font-semibold text-base-content leading-snug line-clamp-2 mb-2">{listing.title}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-base-content">₹{listing.price.toLocaleString('en-IN')}</span>
            {hasDiscount && (
              <span className="text-xs text-base-content/40 line-through ml-1.5">₹{listing.compareAtPrice!.toLocaleString('en-IN')}</span>
            )}
          </div>
          {listing.rating > 0 && (
            <div className="flex items-center gap-1">
              <HiOutlineStar className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-base-content/50">{listing.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {listing.soldCount > 0 && (
          <p className="text-[10px] text-base-content/40 mt-1">{listing.soldCount} sold</p>
        )}
      </div>
    </div>
  )
}

export function StorefrontClient({
  data,
}: {
  data: { sellerProfile: SellerProfile | null; listings: Listing[] }
}) {
  const { sellerProfile: profile, listings } = data
  const activeListings = listings.filter((l) => l.status === 'active')

  return (
    <div className="min-h-screen bg-base-200">
      {/* Preview banner */}
      <div className="sticky top-0 z-40 bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-900/50 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineEye className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            Storefront preview — this is what buyers see
          </span>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
        >
          <HiOutlineArrowLeft className="w-3.5 h-3.5" />
          Back to dashboard
        </Link>
      </div>

      {profile && (
        <>
          {/* Cover & profile */}
          <div className="relative">
            <div
              className="h-40 sm:h-56 bg-gradient-to-br from-rose-400 to-amber-500"
              style={
                profile.coverImage
                  ? { backgroundImage: `url(${profile.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : {}
              }
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="flex items-end gap-4 -mt-12 pb-4">
                <div className="w-24 h-24 rounded-2xl ring-4 ring-white overflow-hidden bg-gradient-to-br from-rose-200 to-amber-200 dark:from-rose-900 dark:to-amber-900 flex-shrink-0 shadow-lg">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt={profile.storeName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-rose-700 dark:text-rose-300">
                        {profile.storeName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-base-content leading-tight">{profile.storeName}</h1>
                    {profile.ondcRegistered && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        <HiOutlineCheckBadge className="w-3 h-3" />
                        ONDC
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-base-content/50 mt-0.5 truncate">{profile.tagline}</p>
                </div>
                <button className="p-2 rounded-xl bg-base-100 ring-1 ring-base-300 text-base-content/40 hover:text-base-content/70 transition-colors">
                  <HiOutlineShare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile info bar */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/50">
              <div className="flex items-center gap-1.5">
                <StarRating rating={profile.rating} />
                <span className="font-semibold text-base-content/80">{profile.rating.toFixed(1)}</span>
                <span className="text-base-content/40">({profile.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineShoppingBag className="w-3.5 h-3.5" />
                <span>{profile.totalSales.toLocaleString('en-IN')} sales</span>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineMapPin className="w-3.5 h-3.5" />
                <span>{profile.location.city}, {profile.location.state}</span>
              </div>
              <span className="text-xs">Responds in {profile.responseTime}</span>
            </div>

            {profile.bio && (
              <p className="text-sm text-base-content/60 leading-relaxed mt-3 max-w-2xl">{profile.bio}</p>
            )}

            {/* Skills/badges */}
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {profile.skills.map((skill) => (
                  <span key={skill} className="text-xs font-medium text-base-content/50 bg-base-200 px-2.5 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-base-200" />
        </>
      )}

      {/* Listings */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-base-content/80">
            {activeListings.length} active listing{activeListings.length !== 1 ? 's' : ''}
          </h2>
          {listings.length > activeListings.length && (
            <span className="text-xs text-base-content/40">
              {listings.length - activeListings.length} hidden (draft/archived)
            </span>
          )}
        </div>

        {activeListings.length === 0 ? (
          <div className="text-center py-16 text-base-content/35">
            <HiOutlineTag className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm font-medium">No active listings</p>
            <p className="text-xs mt-1">Publish listings to see them here.</p>
            <Link
              href="/marketplace/listings/new"
              className="inline-block mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Create listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {/* Policies */}
      {profile && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
          <div className="h-px bg-base-200 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.shippingPolicy && (
              <div className="bg-base-100 rounded-2xl p-4 ring-1 ring-base-300">
                <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-2">Shipping</p>
                <p className="text-sm text-base-content/60 leading-relaxed">{profile.shippingPolicy}</p>
              </div>
            )}
            {profile.returnPolicy && (
              <div className="bg-base-100 rounded-2xl p-4 ring-1 ring-base-300">
                <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-2">Returns</p>
                <p className="text-sm text-base-content/60 leading-relaxed">{profile.returnPolicy}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
