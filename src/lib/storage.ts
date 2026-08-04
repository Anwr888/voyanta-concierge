import { ItineraryDay } from "@/lib/types";

export interface SavedTrip {
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

const TRIP_KEY = "voyanta:trip";
const FAVORITES_KEY = "voyanta:favorites";

export function saveTrip(trip: Omit<SavedTrip, "savedAt">) {
  if (typeof window === "undefined") return;
  const record: SavedTrip = { ...trip, savedAt: new Date().toISOString() };
  window.localStorage.setItem(TRIP_KEY, JSON.stringify(record));
}

export function loadTrip(): SavedTrip | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(TRIP_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedTrip;
  } catch {
    return null;
  }
}

export function clearTrip() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TRIP_KEY);
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
