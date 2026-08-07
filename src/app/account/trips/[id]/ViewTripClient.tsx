"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getTripById, SavedTrip } from "@/lib/storage";
import { islands } from "@/lib/data/islands";
import { budgetOptions } from "@/lib/data/quiz";
import { getCategory } from "@/lib/data/categories";
import { estimateTripCost } from "@/lib/itinerary";
import { formatTripDateRange, getTripDisplayName } from "@/lib/format";

// A clean, read-only rendering of a saved itinerary — no drag handles, no
// time picker, no Marketplace panel. For a quick look at a trip without
// jumping into the full Trip Builder editor.
export function ViewTripClient() {
  const params = useParams<{ id: string }>();
  const [trip, setTrip] = useState<SavedTrip | null | undefined>(undefined);

  useEffect(() => {
    // Saved trips live in localStorage, only readable after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrip(getTripById(params.id));
  }, [params.id]);

  if (trip === undefined) {
    return <div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Loading trip…</div>;
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900/5 text-navy-800">
          <Icon name="TriangleAlert" size={28} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-navy-900">Trip not found.</h1>
        <p className="mt-3 text-ink-soft">It may have been deleted, or the link isn&apos;t valid.</p>
        <Link
          href="/account/trips"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          Back to My Trips
        </Link>
      </div>
    );
  }

  const island = islands.find((i) => i.slug === trip.island);
  const islandName = island?.name ?? trip.island;
  const displayName = getTripDisplayName(trip, islandName);
  const cost = estimateTripCost(trip.budget, trip.nights, trip.adults, trip.children);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link href="/account/trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-navy-900">
        <Icon name="ArrowLeft" size={14} />
        Back to My Trips
      </Link>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="eyebrow">Trip Overview</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">{displayName}</h1>
        </div>
        <Link
          href={`/trip-builder?tripId=${trip.id}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors w-fit shrink-0"
        >
          Continue Planning
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Island", value: islandName },
          { label: "Dates", value: formatTripDateRange(trip.startDate, trip.nights) },
          {
            label: "Travelers",
            value: `${trip.adults} adult${trip.adults !== 1 ? "s" : ""}${
              trip.children ? `, ${trip.children} child${trip.children !== 1 ? "ren" : ""}` : ""
            }`,
          },
          { label: "Budget", value: budgetOptions.find((b) => b.id === trip.budget)?.label ?? trip.budget },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-navy-900/10 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{item.label}</p>
            <p className="mt-1 text-sm font-semibold text-navy-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-sand-100 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Estimated trip cost</p>
        <p className="mt-1 font-display text-2xl text-navy-900">
          ${cost.low.toLocaleString()}–${cost.high.toLocaleString()}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {trip.days.map((day) => (
          <div key={day.day} className="rounded-2xl border border-navy-900/10 bg-white overflow-hidden">
            <div className="flex items-center gap-3 bg-navy-900 px-5 py-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
                {day.day}
              </span>
              <span className="text-sm sm:text-base font-semibold text-white">{day.title}</span>
            </div>
            <div className="divide-y divide-navy-900/8">
              {day.activities.length ? (
                day.activities.map((act) => {
                  const category = act.marketplaceCategoryId ? getCategory(act.marketplaceCategoryId) : undefined;
                  return (
                    <div key={act.id} className="flex gap-3 p-4 sm:p-5">
                      <span className="w-20 shrink-0 rounded-lg bg-sand-100 px-2 py-1.5 text-xs font-semibold text-navy-800 text-center h-fit">
                        {act.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-navy-900">{act.title}</p>
                        {act.provider && act.location && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                            <Icon name="MapPin" size={11} className="shrink-0" />
                            {act.provider} • {act.location}
                          </p>
                        )}
                        {act.description && <p className="mt-1 text-sm text-ink-soft">{act.description}</p>}
                        {act.category && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
                            {category?.name ?? act.category}
                          </span>
                        )}
                      </div>
                      {act.marketplaceListingId && (
                        <Link
                          href={`/marketplace/business/${act.marketplaceListingId}`}
                          className="shrink-0 self-start text-xs font-semibold text-teal-700 hover:text-teal-800"
                        >
                          View listing
                        </Link>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="p-5 text-center text-xs text-ink-soft/70">Nothing planned for this day yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
