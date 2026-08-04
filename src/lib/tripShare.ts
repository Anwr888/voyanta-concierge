import { SavedTrip } from "@/lib/storage";

// Encodes the trip directly into a shareable URL (no backend) so anyone with
// the link sees the same itinerary, exactly as currently edited.
export function encodeTrip(trip: Omit<SavedTrip, "savedAt">): string {
  const json = JSON.stringify(trip);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeTrip(encoded: string): Omit<SavedTrip, "savedAt"> | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
