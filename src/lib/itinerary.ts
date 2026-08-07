import { ItineraryDay, ItineraryActivity } from "@/lib/types";
import { getItineraryTemplate } from "@/lib/data/itineraries";

let counter = 0;
const nextId = () => `custom-${Date.now()}-${counter++}`;

export function buildTripDays(vacationType: string, nights: number): ItineraryDay[] {
  const template = getItineraryTemplate(vacationType);
  const baseDays = template.days;
  const targetLength = Math.max(1, nights);

  let days: ItineraryDay[];
  if (targetLength <= baseDays.length) {
    days = baseDays.slice(0, targetLength);
  } else {
    const extra = targetLength - baseDays.length;
    const extraDays: ItineraryDay[] = Array.from({ length: extra }).map((_, idx) => ({
      day: baseDays.length + idx + 1,
      title: "Open Day — Explore at Your Own Pace",
      activities: [
        {
          id: nextId(),
          time: "10:00 AM",
          title: "Free time",
          description:
            "Nothing planned yet — revisit a favorite spot, browse the marketplace for something new, or simply relax.",
          category: "Relaxation",
          editable: true,
        },
      ],
    }));
    days = [...baseDays, ...extraDays];
  }

  return days.map((d, i) => ({ ...d, day: i + 1 }));
}

export function newActivityId() {
  return nextId();
}

// The window a day's activities get spread across when their times are
// auto-recalculated after a drag-and-drop reorder.
const DAY_START_MIN = 9 * 60; // 9:00 AM
const DAY_END_MIN = 22 * 60; // 10:00 PM
const DEFAULT_SPACING_MIN = 120; // 2 hours between activities, the common case
const MIN_SPACING_MIN = 45; // never crowd activities closer than this

function formatClockTime(totalMinutes: number): string {
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const m = Math.round(totalMinutes % 60);
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

// Reassigns every activity's time by its position in the list, starting at
// 9:00 AM and spacing them 2 hours apart by default. With enough activities
// that a 2-hour gap would run past 10:00 PM, the spacing compresses evenly
// (rounded to a clean 15-minute mark) so the day's activities still all fit,
// rather than sliding later and later. Order in `activities` is taken as
// already final — this only rewrites `time`, nothing else about each
// activity, and never reorders them itself.
export function recalculateActivityTimes(activities: ItineraryActivity[]): ItineraryActivity[] {
  const n = activities.length;
  if (n === 0) return activities;

  let spacing = DEFAULT_SPACING_MIN;
  if (n > 1) {
    const neededSpan = DEFAULT_SPACING_MIN * (n - 1);
    const availableSpan = DAY_END_MIN - DAY_START_MIN;
    if (neededSpan > availableSpan) {
      spacing = Math.max(MIN_SPACING_MIN, Math.floor(availableSpan / (n - 1) / 15) * 15);
    }
  }

  return activities.map((act, i) => ({ ...act, time: formatClockTime(DAY_START_MIN + i * spacing) }));
}

// Selectable options for the manual time picker: every half hour from
// 6:00 AM to 11:30 PM, covering any reasonable activity time.
export const activityTimeOptions: string[] = (() => {
  const options: string[] = [];
  for (let min = 6 * 60; min <= 23 * 60 + 30; min += 30) {
    options.push(formatClockTime(min));
  }
  return options;
})();

export const estimateBudgetPerDay: Record<string, [number, number]> = {
  "budget-friendly": [80, 150],
  moderate: [150, 300],
  premium: [300, 600],
  luxury: [600, 1200],
};

export function estimateTripCost(budget: string, nights: number, adults: number, children: number) {
  const [lo, hi] = estimateBudgetPerDay[budget] ?? estimateBudgetPerDay.moderate;
  const travelers = adults + children * 0.5;
  return {
    low: Math.round(lo * nights * Math.max(travelers, 1)),
    high: Math.round(hi * nights * Math.max(travelers, 1)),
  };
}
