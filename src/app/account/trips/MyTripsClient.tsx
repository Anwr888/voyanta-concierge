"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getTrips, SavedTrip } from "@/lib/storage";
import { islands } from "@/lib/data/islands";
import { formatTripDateRange, formatRelativeTime } from "@/lib/format";

export function MyTripsClient() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Saved trips live in localStorage, only readable after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    setTrips(getTrips());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Your Account</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">My Trips</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Every itinerary you&apos;ve built, autosaved as you go. Pick one up right where you left off.
      </p>

      {ready && (
        trips.length ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trips.map((trip) => {
              const island = islands.find((i) => i.slug === trip.island);
              const travelers = trip.adults + trip.children;
              return (
                <div key={trip.id} className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-5">
                  <p className="font-display text-lg text-navy-900">
                    {trip.nights} Days in {island?.name ?? trip.island}
                  </p>
                  <dl className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    <div className="flex items-center gap-1.5">
                      <Icon name="CalendarDays" size={13} className="shrink-0" />
                      <dd>{formatTripDateRange(trip.startDate, trip.nights)}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Users" size={13} className="shrink-0" />
                      <dd>
                        {travelers} traveler{travelers !== 1 ? "s" : ""}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink-soft/70">
                      <Icon name="Clock" size={13} className="shrink-0" />
                      <dd>Last edited {formatRelativeTime(trip.savedAt)}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/trip-builder?tripId=${trip.id}`}
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
                  >
                    Continue Planning
                    <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-navy-900/15 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/5 text-navy-800">
              <Icon name="Map" size={24} />
            </div>
            <p className="mt-4 text-sm text-ink-soft">No trips saved yet.</p>
            <Link
              href="/plan"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Start the Vacation Planner
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        )
      )}
    </div>
  );
}
