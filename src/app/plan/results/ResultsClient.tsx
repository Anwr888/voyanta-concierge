"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ItineraryEditor } from "@/components/ItineraryEditor";
import { ItineraryDay } from "@/lib/types";
import { buildTripDays, estimateTripCost } from "@/lib/itinerary";
import { islands } from "@/lib/data/islands";
import { budgetOptions } from "@/lib/data/quiz";
import { upsertTrip, newTripId } from "@/lib/storage";

export function ResultsClient() {
  const params = useSearchParams();

  const island = params.get("island") ?? "new-providence-nassau";
  const startDate = params.get("startDate") ?? "";
  const nights = Number(params.get("nights") ?? 5);
  const adults = Number(params.get("adults") ?? 2);
  const children = Number(params.get("children") ?? 0);
  const budget = params.get("budget") ?? "moderate";
  const vacationType = params.get("vacationType") ?? "Family";

  const tripKey = `${vacationType}-${nights}`;
  const [days, setDays] = useState<ItineraryDay[]>(() => buildTripDays(vacationType, nights));
  const [saved, setSaved] = useState(false);
  const [loadedKey, setLoadedKey] = useState(tripKey);
  // Regenerated whenever a fresh planning session starts (tripKey changes),
  // so re-saving the same session updates one trip instead of duplicating
  // it, while starting over creates a genuinely new saved trip.
  const [tripId, setTripId] = useState(() => newTripId());

  if (tripKey !== loadedKey) {
    setLoadedKey(tripKey);
    setDays(buildTripDays(vacationType, nights));
    setSaved(false);
    setTripId(newTripId());
  }

  const selectedIsland = islands.find((i) => i.slug === island);
  const cost = estimateTripCost(budget, nights, adults, children);

  function handleSave() {
    upsertTrip({ id: tripId, island, startDate, nights, adults, children, budget, vacationType, days });
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 print:hidden">
        <div>
          <p className="eyebrow">Your Itinerary</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
            {nights} Days in {selectedIsland?.name}
          </h1>
          <p className="mt-2 text-ink-soft">{vacationType} vacation · Fully editable below</p>
        </div>
        <Link href="/plan" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-navy-900">
          <Icon name="RotateCcw" size={14} />
          Start over
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ItineraryEditor days={days} onChange={setDays} />
        </div>

        <aside className="order-1 lg:order-2 space-y-4 print:hidden">
          <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sticky top-24">
            <h2 className="font-display text-lg text-navy-900">Trip Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Island</dt>
                <dd className="font-medium text-navy-900 text-right">{selectedIsland?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Dates</dt>
                <dd className="font-medium text-navy-900">{startDate || "Flexible"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Length</dt>
                <dd className="font-medium text-navy-900">{nights} nights</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Travelers</dt>
                <dd className="font-medium text-navy-900">
                  {adults} adult{adults !== 1 ? "s" : ""}
                  {children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Budget</dt>
                <dd className="font-medium text-navy-900">{budgetOptions.find((b) => b.id === budget)?.label}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-xl bg-sand-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Estimated trip cost</p>
              <p className="mt-1 font-display text-2xl text-navy-900">
                ${cost.low.toLocaleString()}–${cost.high.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] text-ink-soft">
                Rough estimate from your budget tier. Excludes flights; actual costs depend on providers booked.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
              >
                <Icon name={saved ? "Check" : "Save"} size={15} />
                {saved ? "Saved to Trip Builder" : "Save to Trip Builder"}
              </button>
              {saved && (
                <Link
                  href={`/trip-builder?tripId=${tripId}`}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
                >
                  Open in Trip Builder
                  <Icon name="ArrowRight" size={14} />
                </Link>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
              >
                <Icon name="Printer" size={15} />
                Print / Save as PDF
              </button>
              <Link
                href="/marketplace"
                className="flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-500/10 transition-colors"
              >
                Browse providers for this trip
                <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
