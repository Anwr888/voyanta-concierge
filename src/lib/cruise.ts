import { CruiseDurationBand, CruisePackage } from "@/lib/types";
import { cruisePackages } from "@/lib/data/packages";

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function bandForMinutes(totalMinutes: number): CruiseDurationBand {
  if (totalMinutes <= 180) return "under-3";
  if (totalMinutes <= 240) return "3-to-4";
  if (totalMinutes <= 360) return "4-to-6";
  return "6-plus";
}

export const bandLabels: Record<CruiseDurationBand, string> = {
  "under-3": "Under 3 Hours",
  "3-to-4": "3–4 Hours",
  "4-to-6": "4–6 Hours",
  "6-plus": "6+ Hours",
};

// Buffer minutes reserved at the start (disembarkation, clearing the
// terminal) and end (transportation back, boarding) of the port window,
// scaled by how much total time is available. The 6-plus tier reproduces the
// project brief's worked example exactly: 9:00 AM dock / 4:30 PM all-aboard
// (450 min total) -> 60 min start buffer, 120 min end buffer -> a
// recommended window of 10:00 AM-2:30 PM.
const BUFFER_BY_BAND: Record<CruiseDurationBand, { start: number; end: number }> = {
  "under-3": { start: 30, end: 45 },
  "3-to-4": { start: 45, end: 60 },
  "4-to-6": { start: 60, end: 90 },
  "6-plus": { start: 60, end: 120 },
};

export interface ReturnBufferResult {
  totalMinutes: number;
  band: CruiseDurationBand;
  startBufferMinutes: number;
  endBufferMinutes: number;
  windowStartMinutes: number;
  windowEndMinutes: number;
  windowMinutes: number;
  windowHours: number;
  isValid: boolean;
}

export function computeReturnBuffer(dockingTime: string, allAboardTime: string): ReturnBufferResult {
  const dock = timeToMinutes(dockingTime);
  const allAboard = timeToMinutes(allAboardTime);
  const totalMinutes = allAboard - dock;
  const isValid = totalMinutes > 0;
  const band = bandForMinutes(Math.max(totalMinutes, 1));
  const { start, end } = BUFFER_BY_BAND[band];

  const windowStartMinutes = dock + start;
  const windowEndMinutes = Math.max(allAboard - end, windowStartMinutes);
  const windowMinutes = Math.max(windowEndMinutes - windowStartMinutes, 0);

  return {
    totalMinutes,
    band,
    startBufferMinutes: start,
    endBufferMinutes: end,
    windowStartMinutes,
    windowEndMinutes,
    windowMinutes,
    windowHours: windowMinutes / 60,
    isValid,
  };
}

export interface CruiseRecommendationInput {
  buffer: ReturnBufferResult;
  interests: string[];
  budgetMax?: number;
  familyFriendly?: boolean;
}

export function recommendPackages({ buffer, interests, budgetMax, familyFriendly }: CruiseRecommendationInput): CruisePackage[] {
  const totalHours = buffer.totalMinutes / 60;
  const windowHours = buffer.windowHours;

  const scored = cruisePackages
    .filter((p) => p.durationHours <= windowHours + 0.25 && p.minPortTimeHours <= totalHours + 0.25)
    .filter((p) => (budgetMax ? p.priceFrom <= budgetMax : true))
    .filter((p) => (familyFriendly ? p.familyFriendly : true))
    .map((p) => {
      const interestMatches = interests.length
        ? p.interests.filter((i) => interests.includes(i)).length
        : 0;
      return { p, interestMatches };
    })
    .sort((a, b) => {
      if (a.interestMatches !== b.interestMatches) return b.interestMatches - a.interestMatches;
      // For shorter windows, favor activities closer to the port.
      if (windowHours <= 4) return a.p.distanceFromPortMinutes - b.p.distanceFromPortMinutes;
      return a.p.distanceFromPortMinutes - b.p.distanceFromPortMinutes;
    });

  return scored.map((s) => s.p);
}
