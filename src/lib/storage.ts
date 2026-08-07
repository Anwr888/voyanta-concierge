import { ItineraryDay } from "@/lib/types";

export interface SavedTrip {
  id: string;
  island: string;
  startDate: string;
  nights: number;
  adults: number;
  children: number;
  budget: string;
  vacationType: string;
  days: ItineraryDay[];
  savedAt: string;
}

const TRIPS_KEY = "voyanta:trips";
// Superseded by TRIPS_KEY (a list). Read once for a one-time migration so
// anyone with a trip saved under the old single-trip system doesn't lose it.
const LEGACY_TRIP_KEY = "voyanta:trip";
const FAVORITES_KEY = "voyanta:favorites";

export function newTripId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `trip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readTrips(): SavedTrip[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(TRIPS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as SavedTrip[];
    } catch {
      return [];
    }
  }

  const legacyRaw = window.localStorage.getItem(LEGACY_TRIP_KEY);
  if (!legacyRaw) return [];
  try {
    const legacy = JSON.parse(legacyRaw) as Omit<SavedTrip, "id"> & { id?: string };
    const migrated: SavedTrip[] = [{ ...legacy, id: legacy.id ?? newTripId() }];
    window.localStorage.setItem(TRIPS_KEY, JSON.stringify(migrated));
    window.localStorage.removeItem(LEGACY_TRIP_KEY);
    return migrated;
  } catch {
    return [];
  }
}

function writeTrips(trips: SavedTrip[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
}

// Most recently edited first.
export function getTrips(): SavedTrip[] {
  return [...readTrips()].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

export function getTripById(id: string): SavedTrip | null {
  return readTrips().find((t) => t.id === id) ?? null;
}

export function getMostRecentTrip(): SavedTrip | null {
  return getTrips()[0] ?? null;
}

// Creates the trip if `trip.id` isn't already saved, otherwise overwrites
// that trip in place — the same call the Trip Builder's autosave and the
// Vacation Planner's "save to builder" action both use.
export function upsertTrip(trip: Omit<SavedTrip, "savedAt">): SavedTrip {
  const trips = readTrips();
  const record: SavedTrip = { ...trip, savedAt: new Date().toISOString() };
  const idx = trips.findIndex((t) => t.id === record.id);
  if (idx === -1) trips.push(record);
  else trips[idx] = record;
  writeTrips(trips);
  return record;
}

export function deleteTrip(id: string) {
  writeTrips(readTrips().filter((t) => t.id !== id));
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string) {
  const current = getFavorites();
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}
