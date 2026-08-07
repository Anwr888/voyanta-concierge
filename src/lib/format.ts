// Shared, human-readable formatting for the "distance from cruise port /
// experience duration / suggested transport" facts shown across business
// cards, business profiles, cruise packages, and guides.

export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return `${hours % 1 === 0 ? hours : hours.toFixed(1)} hr`;
}

export function formatDistanceFromPort(minutes: number, isEstimate?: boolean): string {
  return `~${minutes} min from port${isEstimate ? " (est.)" : ""}`;
}

// Same ≤30 min threshold already used by the marketplace's "Near the cruise
// port" filter — kept in one place so the "Cruise-friendly" badge and that
// filter never drift apart.
export const CRUISE_FRIENDLY_MAX_MINUTES = 30;

export function isCruiseFriendly(distanceFromCruisePortMinutes: number | undefined): boolean {
  return distanceFromCruisePortMinutes !== undefined && distanceFromCruisePortMinutes <= CRUISE_FRIENDLY_MAX_MINUTES;
}

// "Aug 12–17" for a same-month stay, "Aug 30–Sep 4" across a month boundary,
// or a flexible-dates fallback when no start date was set.
export function formatTripDateRange(startDate: string, nights: number): string {
  if (!startDate) return "Dates flexible";
  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return "Dates flexible";
  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(0, nights));

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  return startMonth === endMonth
    ? `${startMonth} ${start.getDate()}–${end.getDate()}`
    : `${startMonth} ${start.getDate()}–${endMonth} ${end.getDate()}`;
}

// "just now" / "12 minutes ago" / "3 days ago" / a plain date once it's been
// long enough that a relative label stops being useful.
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";

  const diffMin = Math.floor((Date.now() - then) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;

  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek} week${diffWeek === 1 ? "" : "s"} ago`;

  return new Date(then).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// A saved trip's display name: the traveler's own name if they set one,
// otherwise a generated "{nights} Days in {island}" label — including for
// trips saved before the name field existed. Takes an already-resolved
// island display name so this stays independent of the islands data module.
export function getTripDisplayName(trip: { name?: string; nights: number }, islandName: string): string {
  return trip.name?.trim() || `${trip.nights} Days in ${islandName}`;
}
