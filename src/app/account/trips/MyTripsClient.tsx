"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getTrips, renameTrip, duplicateTrip, deleteTrip, SavedTrip } from "@/lib/storage";
import { islands } from "@/lib/data/islands";
import { formatTripDateRange, formatRelativeTime, getTripDisplayName } from "@/lib/format";

export function MyTripsClient() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [ready, setReady] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Saved trips live in localStorage, only readable after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    setTrips(getTrips());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!menuOpenId) return;
    function onPointerDown(e: PointerEvent) {
      if (menuRef.current?.contains(e.target as Node)) return;
      setMenuOpenId(null);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpenId(null);
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpenId]);

  function startRename(trip: SavedTrip, islandName: string) {
    setMenuOpenId(null);
    setRenamingId(trip.id);
    setRenameValue(getTripDisplayName(trip, islandName));
  }

  function commitRename(id: string) {
    const trimmed = renameValue.trim();
    if (trimmed) {
      renameTrip(id, trimmed);
      setTrips(getTrips());
    }
    setRenamingId(null);
  }

  function handleDuplicate(id: string) {
    duplicateTrip(id);
    setTrips(getTrips());
    setMenuOpenId(null);
  }

  function handleDelete(id: string, name: string) {
    setMenuOpenId(null);
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    deleteTrip(id);
    setTrips(getTrips());
  }

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
              const islandName = island?.name ?? trip.island;
              const displayName = getTripDisplayName(trip, islandName);
              const travelers = trip.adults + trip.children;
              const isRenaming = renamingId === trip.id;

              return (
                <div key={trip.id} className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-5">
                  <div className="flex items-start justify-between gap-2">
                    {isRenaming ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => commitRename(trip.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            commitRename(trip.id);
                          }
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        aria-label="Trip name"
                        className="min-w-0 flex-1 rounded-lg border border-navy-900/15 px-2 py-1 font-display text-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
                      />
                    ) : (
                      <p className="min-w-0 flex-1 truncate font-display text-lg text-navy-900">{displayName}</p>
                    )}

                    <div className="relative shrink-0">
                      <button
                        type="button"
                        aria-label="Trip options"
                        aria-haspopup="menu"
                        aria-expanded={menuOpenId === trip.id}
                        onClick={() => setMenuOpenId((v) => (v === trip.id ? null : trip.id))}
                        className="rounded-full p-1.5 text-navy-800/50 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
                      >
                        <Icon name="MoreVertical" size={16} />
                      </button>
                      {menuOpenId === trip.id && (
                        <div
                          ref={menuRef}
                          role="menu"
                          className="absolute right-0 top-full z-20 mt-1 w-40 rounded-xl border border-navy-900/10 bg-white p-1 shadow-xl shadow-navy-950/10"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => startRename(trip, islandName)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-navy-800 hover:bg-sand-100 transition-colors"
                          >
                            <Icon name="Pencil" size={14} />
                            Rename
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleDuplicate(trip.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-navy-800 hover:bg-sand-100 transition-colors"
                          >
                            <Icon name="Copy" size={14} />
                            Duplicate
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleDelete(trip.id, displayName)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Icon name="Trash2" size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <dl className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    <div className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={13} className="shrink-0" />
                      <dd>{islandName}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="CalendarDays" size={13} className="shrink-0" />
                      <dd>
                        {formatTripDateRange(trip.startDate, trip.nights)} · {trip.nights} day{trip.nights !== 1 ? "s" : ""}
                      </dd>
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

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/trip-builder?tripId=${trip.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
                    >
                      Continue Planning
                      <Icon name="ArrowRight" size={14} />
                    </Link>
                    <Link
                      href={`/account/trips/${trip.id}`}
                      aria-label={`View ${displayName}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
                    >
                      View
                    </Link>
                  </div>
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
