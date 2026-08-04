import Link from "next/link";
import { Business } from "@/lib/types";
import { BusinessMedia } from "@/components/BusinessMedia";
import { RatingStars, PriceLevel } from "@/components/RatingStars";
import { Icon } from "@/components/Icon";
import { FavoriteButton } from "@/components/FavoriteButton";

export function BusinessCard({ business, seed = 0 }: { business: Business; seed?: number }) {
  return (
    <Link
      href={`/marketplace/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative">
        <BusinessMedia category={business.category} seed={seed} className="h-44 w-full" />
        {business.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold-600 uppercase">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/70 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
          {business.subcategory}
        </span>
        <FavoriteButton slug={business.slug} className="absolute top-3 right-3" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-navy-900 group-hover:text-navy-700">
            {business.name}
          </h3>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
          <Icon name="MapPin" size={12} />
          {business.area}, {business.island}
        </p>
        <p className="mt-2 text-sm text-ink-soft line-clamp-2">{business.shortDescription}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <RatingStars rating={business.rating} />
            <span className="text-xs font-medium text-ink-soft">
              {business.rating.toFixed(1)} ({business.reviewCount})
            </span>
          </div>
          <PriceLevel level={business.priceLevel} />
        </div>
      </div>
    </Link>
  );
}
