"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Business, MarketplaceCategoryId } from "@/lib/types";
import { businesses } from "@/lib/data/businesses";
import { categories } from "@/lib/data/categories";
import { BusinessMedia } from "@/components/BusinessMedia";
import { RatingStars, PriceLevel } from "@/components/RatingStars";
import { Icon } from "@/components/Icon";
import { formatDistanceFromPort, formatDurationMinutes, isCruiseFriendly } from "@/lib/format";

// Reusable slide-in picker used by the Trip Builder: given a category, it
// lists real Marketplace businesses for that category and reports the one
// the traveler chose back to the caller. The caller decides what to do with
// it (Trip Builder writes it into the specific day/time activity it was
// opened for) — this component has no idea which activity it's filling in.
export interface MarketplacePickerPanelProps {
  open: boolean;
  slotLabel: string;
  initialCategoryId: MarketplaceCategoryId | "";
  onClose: () => void;
  onSelect: (business: Business) => void;
}

function ReviewsSummary({ business }: { business: Business }) {
  if (business.rating !== undefined) {
    return (
      <div className="flex items-center gap-1.5">
        <RatingStars rating={business.rating} size={13} />
        <span className="text-xs font-medium text-ink-soft">
          {business.rating.toFixed(1)} ({business.reviewCount})
        </span>
      </div>
    );
  }
  if (business.reviewLinks) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-teal-700">
        <Icon name="ArrowUpRight" size={11} />
        See reviews
      </span>
    );
  }
  return <span className="text-xs text-ink-soft/60">Reviews unavailable</span>;
}

function ResultCard({
  business,
  onViewDetails,
  onSelect,
}: {
  business: Business;
  onViewDetails: () => void;
  onSelect: () => void;
}) {
  const cruiseFriendly = isCruiseFriendly(business.distanceFromCruisePortMinutes);
  const familyFriendly = business.tags.includes("family-friendly");

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white">
      <button type="button" onClick={onViewDetails} className="block w-full text-left">
        <BusinessMedia category={business.category} className="h-32 w-full" iconSize={30} />
      </button>
      <div className="p-3.5">
        <button type="button" onClick={onViewDetails} className="block w-full text-left">
          <h4 className="font-display text-base leading-snug text-navy-900">{business.name}</h4>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
            <Icon name="MapPin" size={11} />
            {business.area}, {business.island}
          </p>
          <p className="mt-1.5 text-xs text-ink-soft line-clamp-2">{business.shortDescription}</p>
        </button>

        {(cruiseFriendly || familyFriendly) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cruiseFriendly && (
              <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                <Icon name="Anchor" size={10} />
                Cruise-friendly
              </span>
            )}
            {familyFriendly && (
              <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                <Icon name="Users" size={10} />
                Family-friendly
              </span>
            )}
          </div>
        )}

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <ReviewsSummary business={business} />
          {business.priceLevel !== undefined ? (
            <PriceLevel level={business.priceLevel} />
          ) : (
            <span className="text-xs text-ink-soft/60">Price N/A</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="flex-1 rounded-full border border-navy-900/15 px-3 py-2 text-xs font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={onSelect}
            className="flex-1 rounded-full bg-navy-900 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Add to Trip
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailView({
  business,
  onBack,
  onSelect,
}: {
  business: Business;
  onBack: () => void;
  onSelect: () => void;
}) {
  const cruiseFriendly = isCruiseFriendly(business.distanceFromCruisePortMinutes);
  const familyFriendly = business.tags.includes("family-friendly");

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-navy-900"
      >
        <Icon name="ChevronLeft" size={14} />
        Back to results
      </button>

      <div className="mt-3 overflow-hidden rounded-2xl border border-navy-900/10">
        <BusinessMedia category={business.category} className="h-40 w-full" iconSize={40} />
        <div className="p-4">
          <h4 className="font-display text-xl text-navy-900">{business.name}</h4>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
            <Icon name="MapPin" size={12} />
            {business.address || `${business.area}, ${business.island}`}
          </p>
          <p className="mt-2.5 text-sm text-ink-soft leading-relaxed">{business.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
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

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-navy-900/8 pt-3">
            <ReviewsSummary business={business} />
            {business.priceLevel !== undefined ? (
              <PriceLevel level={business.priceLevel} />
            ) : (
              <span className="text-xs text-ink-soft/60">Price N/A</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/marketplace/business/${business.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          View in Marketplace
          <Icon name="ArrowUpRight" size={11} />
        </Link>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
      >
        Add to Trip
      </button>
    </div>
  );
}

export function MarketplacePickerPanel({ open, slotLabel, initialCategoryId, onClose, onSelect }: MarketplacePickerPanelProps) {
  const [categoryId, setCategoryId] = useState<MarketplaceCategoryId | "">(initialCategoryId);
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [wasOpen, setWasOpen] = useState(open);

  // Each time the panel opens for a (possibly different) activity, start
  // fresh on that activity's own category instead of wherever the last row
  // left off. Adjusted during render (React's recommended pattern for
  // resetting state on a prop transition) rather than in an effect, so there
  // is no extra render where the panel briefly shows the previous state.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setCategoryId(initialCategoryId);
      setDetailSlug(null);
    }
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const results = categoryId ? businesses.filter((b) => b.category === categoryId) : [];
  const detailBusiness = detailSlug ? businesses.find((b) => b.slug === detailSlug) ?? null : null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Choose a Marketplace experience">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-sand-50 shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-navy-900/10 bg-white px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{slotLabel}</p>
            <h3 className="font-display text-lg text-navy-900">Choose an experience</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-2 text-navy-900/50 hover:bg-navy-900/5 hover:text-navy-900 transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {!detailBusiness && (
          <div className="border-b border-navy-900/10 bg-white px-5 py-3">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    categoryId === c.id ? "bg-navy-900 text-white" : "bg-sand-100 text-navy-700 hover:bg-sand-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {detailBusiness ? (
            <DetailView
              business={detailBusiness}
              onBack={() => setDetailSlug(null)}
              onSelect={() => onSelect(detailBusiness)}
            />
          ) : !categoryId ? (
            <p className="py-10 text-center text-sm text-ink-soft">
              Choose a category above to see relevant Marketplace experiences.
            </p>
          ) : results.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-soft">
              No {categories.find((c) => c.id === categoryId)?.name.toLowerCase()} listings yet — try another category.
            </p>
          ) : (
            <div className="space-y-3">
              {results.map((business) => (
                <ResultCard
                  key={business.id}
                  business={business}
                  onViewDetails={() => setDetailSlug(business.slug)}
                  onSelect={() => onSelect(business)}
                />
              ))}
            </div>
          )}
        </div>

        {!detailBusiness && (
          <div className="border-t border-navy-900/10 bg-white px-5 py-3 text-center">
            <Link href="/marketplace" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
              View in Marketplace
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
