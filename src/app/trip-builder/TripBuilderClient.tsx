"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { DragDropItinerary } from "@/components/DragDropItinerary";
import { ItineraryDay } from "@/lib/types";
import { SavedTrip, loadTrip, saveTrip, clearTrip } from "@/lib/storage";
import { decodeTrip, encodeTrip } from "@/lib/tripShare";
import { estimateTripCost } from "@/lib/itinerary";
import { islands } from "@/lib/data/islands";
import { budgetOptions } from "@/lib/data/quiz";

export function TripBuilderClient() {
  const params = useSearchParams();
  const [trip, setTrip] = useState<Omit<SavedTrip, "savedAt"> | null | undefined>(undefined);
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    // Shared-link data and any previously saved trip both live outside React
    // (URL param decoding, localStorage) and can only be read after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const dataParam = params.get("data");
    if (dataParam) {
      const decoded = decodeTrip(dataParam);
      if (decoded) {
        setTrip(decoded);
        setDays(decoded.days);
        saveTrip(decoded);
        return;
      }
    }
    const stored = loadTrip();
    setTrip(stored);
    setDays(stored?.days ?? []);
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSave() {
    if (!trip) return;
    saveTrip({ ...trip, days });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  async function handleShare() {
    if (!trip) return;
    const encoded = encodeTrip({ ...trip, days });
    const url = `${window.location.origin}/trip-builder?data=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link to share your trip:", url);
    }
  }

  function handleClear() {
    clearTrip();
    setTrip(null);
    setDays([]);
  }

  if (trip === undefined) {
    return <div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Loading your trip…</div>;
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900/5 text-navy-800">
          <Icon name="Map" size={28} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-navy-900">No trip saved yet.</h1>
        <p className="mt-3 text-ink-soft">
          Build a personalized itinerary with the Vacation Planner, then save it here to
          drag, drop, and fine-tune every day.
        </p>
        <Link
          href="/plan"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          Start the Vacation Planner
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    );
  }

  const selectedIsland = islands.find((i) => i.slug === trip.island);
  const cost = estimateTripCost(trip.budget, trip.nights, trip.adults, trip.children);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 print:hidden">
        <div>
          <p className="eyebrow">Trip Builder</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
            {trip.nights} Days in {selectedIsland?.name ?? trip.island}
          </h1>
          <p className="mt-2 text-ink-soft">Drag any activity to reorder it — even across days.</p>
        </div>
        <button onClick={handleClear} type="button" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-red-600">
          <Icon name="X" size={14} />
          Clear trip
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <DragDropItinerary days={days} onChange={setDays} />
        </div>

        <aside className="order-1 lg:order-2 space-y-4 print:hidden">
          <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sticky top-24">
            <h2 className="font-display text-lg text-navy-900">Trip Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Travelers</dt>
                <dd className="font-medium text-navy-900">
                  {trip.adults} adult{trip.adults !== 1 ? "s" : ""}
                  {trip.children ? `, ${trip.children} child${trip.children !== 1 ? "ren" : ""}` : ""}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Budget</dt>
                <dd className="font-medium text-navy-900">{budgetOptions.find((b) => b.id === trip.budget)?.label ?? trip.budget}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Days</dt>
                <dd className="font-medium text-navy-900">{days.length}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-xl bg-sand-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Estimated trip cost</p>
              <p className="mt-1 font-display text-2xl text-navy-900">
                ${cost.low.toLocaleString()}–${cost.high.toLocaleString()}
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
              >
                <Icon name={savedFlash ? "Check" : "Save"} size={15} />
                {savedFlash ? "Saved" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
              >
                <Icon name={copied ? "Check" : "Share2"} size={15} />
                {copied ? "Link copied" : "Share itinerary"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
              >
                <Icon name="Printer" size={15} />
                Print / Save as PDF
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
