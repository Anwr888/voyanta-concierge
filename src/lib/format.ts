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
