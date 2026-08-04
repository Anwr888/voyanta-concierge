import { ItineraryDay } from "@/lib/types";
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
