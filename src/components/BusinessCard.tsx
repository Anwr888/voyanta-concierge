import Link from "next/link";
import { Business } from "@/lib/types";
import { BusinessMedia } from "@/components/BusinessMedia";
import { RatingStars, PriceLevel } from "@/components/RatingStars";
import { Icon } from "@/components/Icon";
import { FavoriteButton } from "@/components/FavoriteButton";
import { formatDistanceFromPort, formatDurationMinutes, isCruiseFriendly } from "@/lib/format";

export function BusinessCard({ business, seed = 0 }: { business: Business; seed?: number }) {
  const cruiseFriendly = isCruiseFriendly(business.distanceFromCruisePortMinutes);
  const familyFriendly = business.tags.includes("family-friendly");
  const hasChips =
    cruiseFriendly ||
    familyFriendly ||
    business.distanceFromCruisePortMinutes !== undefined ||
    business.durationMinutes !== undefined;

  return (
    <Link
      href={`/marketplace/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative">
        <BusinessMedia category={business.category} seed={seed} className="h-44 w-full" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {business.featured && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold-600 uppercase">
              Featured
            </span>
          )}
          {business.verified && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-teal-700 uppercase">
              <Icon name="CircleCheck" size={11} />
              Verified
            </span>
          )}
        </div>
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

        {hasChips && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {cruiseFriendly && (
              <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-1 text-[11px] font-medium text-teal-700">
                <Icon name="Anchor" size={11} />
                Cruise-friendly
              </span>
            )}
            {familyFriendly && (
              <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-1 text-[11px] font-medium text-teal-700">
                <Icon name="Users" size={11} />
                Family-friendly
              </span>
            )}
            {business.distanceFromCruisePortMinutes !== undefined && (
              <span className="flex items-center gap-1 rounded-full bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-700">
                <Icon name="Ship" size={11} />
                {formatDistanceFromPort(business.distanceFromCruisePortMinutes, business.distanceFromCruisePortIsEstimate)}
              </span>
            )}
            {business.durationMinutes !== undefined && (
              <span className="flex items-center gap-1 rounded-full bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-700">
                <Icon name="Hourglass" size={11} />
                {formatDurationMinutes(business.durationMinutes)}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          {business.rating !== undefined ? (
            <div className="flex items-center gap-1.5">
              <RatingStars rating={business.rating} />
              <span className="text-xs font-medium text-ink-soft">
                {business.rating.toFixed(1)} ({business.reviewCount})
              </span>
            </div>
          ) : business.reviewLinks ? (
            <span className="flex items-center gap-1 text-xs font-medium text-teal-700">
              <Icon name="ArrowUpRight" size={11} />
              See reviews
            </span>
          ) : (
            <span className="text-xs text-ink-soft/60">Reviews unavailable</span>
          )}
          {business.priceLevel !== undefined ? (
            <PriceLevel level={business.priceLevel} />
          ) : (
            <span className="text-xs text-ink-soft/60">Price N/A</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1 border-t border-navy-900/8 pt-3 text-xs font-semibold text-teal-700 group-hover:gap-1.5 transition-all">
          View Listing
          <Icon name="ArrowRight" size={12} />
        </div>
      </div>
    </Link>
  );
}
