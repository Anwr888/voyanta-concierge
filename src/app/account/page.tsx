"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { BusinessCard } from "@/components/BusinessCard";
import { getFavorites, getTrips, SavedTrip } from "@/lib/storage";
import { businesses } from "@/lib/data/businesses";
import { islands } from "@/lib/data/islands";

export default function AccountPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Favorites and saved trips live in localStorage, which is only
    // readable after mount (not during SSR).
    /* eslint-disable react-hooks/set-state-in-effect */
    setFavorites(getFavorites());
    setTrips(getTrips());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const favoriteBusinesses = businesses.filter((b) => favorites.includes(b.slug));
  const mostRecentTrip = trips[0] ?? null;
  const selectedIsland = mostRecentTrip ? islands.find((i) => i.slug === mostRecentTrip.island) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Your Account</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">Saved for you</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Full accounts with sign-in are coming soon. For now, your saved trip and favorites live in
        this browser.
      </p>

      {ready && (
        <>
          <section className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl text-navy-900">Your trips</h2>
              {trips.length > 0 && (
                <Link href="/account/trips" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                  See all ({trips.length})
                </Link>
              )}
            </div>
            {mostRecentTrip ? (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-navy-900/10 bg-white p-5">
                <div>
                  <p className="font-display text-lg text-navy-900">
                    {mostRecentTrip.nights} Days in {selectedIsland?.name ?? mostRecentTrip.island}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {mostRecentTrip.vacationType} · {mostRecentTrip.adults} adult{mostRecentTrip.adults !== 1 ? "s" : ""}
                    {mostRecentTrip.children ? `, ${mostRecentTrip.children} child${mostRecentTrip.children !== 1 ? "ren" : ""}` : ""}
                  </p>
                </div>
                <Link
                  href={`/trip-builder?tripId=${mostRecentTrip.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors w-fit"
                >
                  Open Trip Builder
                  <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-navy-900/15 p-8 text-center">
                <p className="text-sm text-ink-soft">No trip saved yet.</p>
                <Link href="/plan" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                  Start the Vacation Planner <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            )}
          </section>

          <section id="favorites" className="mt-12 scroll-mt-24">
            <h2 className="font-display text-xl text-navy-900">Favorite listings</h2>
            {favoriteBusinesses.length ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteBusinesses.map((b, i) => (
                  <BusinessCard key={b.id} business={b} seed={i} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-navy-900/15 p-8 text-center">
                <p className="text-sm text-ink-soft">
                  Tap the heart on any listing in the{" "}
                  <Link href="/marketplace" className="font-semibold text-teal-700">
                    marketplace
                  </Link>{" "}
                  to save it here.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
