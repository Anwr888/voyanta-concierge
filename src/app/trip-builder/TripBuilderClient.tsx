"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { DragDropItinerary } from "@/components/DragDropItinerary";
import { ItineraryDay } from "@/lib/types";
import { SavedTrip, getTripById, getMostRecentTrip, upsertTrip, deleteTrip, newTripId } from "@/lib/storage";
import { decodeTrip, encodeTrip } from "@/lib/tripShare";
import { estimateTripCost } from "@/lib/itinerary";
import { islands } from "@/lib/data/islands";
import { budgetOptions } from "@/lib/data/quiz";
import { getTripDisplayName } from "@/lib/format";

type SaveStatus = "idle" | "saving" | "saved";

export function TripBuilderClient() {
  const params = useSearchParams();
  const [trip, setTrip] = useState<Omit<SavedTrip, "savedAt"> | null | undefined>(undefined);
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");

  // Mirrors of the latest trip/days so the unload flush (and the debounced
  // save) always write what's actually on screen, not a stale closure. Kept
  // in sync via an effect rather than during render, since mutating a ref's
  // `current` while rendering is itself a render side effect to avoid.
  const tripRef = useRef(trip);
  const daysRef = useRef(days);
  useEffect(() => {
    tripRef.current = trip;
    daysRef.current = days;
  }, [trip, days]);

  // The load effect below sets `days` once for hydration — that pass isn't
  // a traveler edit and shouldn't trigger a save (it would also stomp the
  // real `savedAt` with "just now" for a trip nobody actually touched yet).
  const skipNextSaveRef = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Shared-link data and any previously saved trip both live outside React
    // (URL param decoding, localStorage) and can only be read after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const dataParam = params.get("data");
    if (dataParam) {
      const decoded = decodeTrip(dataParam);
      if (decoded) {
        const withId: Omit<SavedTrip, "savedAt"> = { ...decoded, id: decoded.id || newTripId() };
        skipNextSaveRef.current = true;
        setTrip(withId);
        setDays(withId.days);
        upsertTrip(withId);
        return;
      }
    }
    const tripId = params.get("tripId");
    const stored = tripId ? getTripById(tripId) : getMostRecentTrip();
    skipNextSaveRef.current = true;
    setTrip(stored);
    setDays(stored?.days ?? []);
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function flushSave() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (!tripRef.current) return;
    upsertTrip({ ...tripRef.current, days: daysRef.current });
    setStatus("saved");
  }

  // Autosaves every activity add/remove/edit/replace/reorder, debounced so a
  // burst of edits (typing, a fast drag) doesn't hammer localStorage.
  useEffect(() => {
    if (!trip) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    setStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(flushSave, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  // Guarantees the latest edit is on disk even if it's still inside the
  // debounce window when the traveler refreshes, hits Back, switches tabs,
  // or closes the tab — localStorage writes are synchronous, so flushing
  // here is reliable (unlike a network save would be).
  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") flushSave();
    }
    window.addEventListener("beforeunload", flushSave);
    window.addEventListener("pagehide", flushSave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("beforeunload", flushSave);
      window.removeEventListener("pagehide", flushSave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Autosave already covers every edit; this button is for a traveler who
  // wants explicit reassurance that it's saved right now, without waiting
  // out the debounce. Clears any pending debounce and shows the same
  // Saving…/Saved status the autosave uses, with a brief recognizable delay
  // so the click visibly does something (the actual write is effectively
  // instant since it's local storage, not a network call).
  function handleManualSave() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setStatus("saving");
    setTimeout(flushSave, 300);
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
    if (trip) deleteTrip(trip.id);
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
  const displayName = getTripDisplayName(trip, selectedIsland?.name ?? trip.island);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 print:hidden">
        <div>
          <p className="eyebrow">Trip Builder</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">{displayName}</h1>
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

            <div className="mt-5">
              <button
                type="button"
                onClick={handleManualSave}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
              >
                <Icon name="Save" size={15} />
                Save Trip
              </button>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium">
                {status === "saving" ? (
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <Icon name="RotateCcw" size={12} className="animate-spin" />
                    Saving…
                  </span>
                ) : status === "saved" ? (
                  <span className="flex items-center gap-1.5 text-teal-700">
                    <Icon name="Check" size={12} />
                    Saved
                  </span>
                ) : (
                  <span className="text-ink-soft/60">Autosaves as you edit</span>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-2">
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
