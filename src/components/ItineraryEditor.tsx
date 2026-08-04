"use client";

import { ItineraryDay, ItineraryActivity } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { newActivityId } from "@/lib/itinerary";

const categoryOptions = [
  "Transportation",
  "Accommodation",
  "Food",
  "Water Activities",
  "Tours",
  "Beaches",
  "Shopping",
  "Nightlife",
  "Wellness",
  "Events",
  "Sightseeing",
  "Relaxation",
];

export function ItineraryEditor({
  days,
  onChange,
}: {
  days: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}) {
  function updateActivity(dayIdx: number, actIdx: number, patch: Partial<ItineraryActivity>) {
    const next = days.map((d, i) =>
      i !== dayIdx
        ? d
        : { ...d, activities: d.activities.map((a, j) => (j !== actIdx ? a : { ...a, ...patch })) }
    );
    onChange(next);
  }

  function removeActivity(dayIdx: number, actIdx: number) {
    const next = days.map((d, i) =>
      i !== dayIdx ? d : { ...d, activities: d.activities.filter((_, j) => j !== actIdx) }
    );
    onChange(next);
  }

  function addActivity(dayIdx: number) {
    const next = days.map((d, i) =>
      i !== dayIdx
        ? d
        : {
            ...d,
            activities: [
              ...d.activities,
              {
                id: newActivityId(),
                time: "12:00 PM",
                title: "New activity",
                description: "Add a description or pick something from the marketplace.",
                category: "Sightseeing",
                editable: true as const,
              },
            ],
          }
    );
    onChange(next);
  }

  function moveActivity(dayIdx: number, actIdx: number, dir: -1 | 1) {
    const day = days[dayIdx];
    const target = actIdx + dir;
    if (target < 0 || target >= day.activities.length) return;
    const activities = [...day.activities];
    [activities[actIdx], activities[target]] = [activities[target], activities[actIdx]];
    const next = days.map((d, i) => (i !== dayIdx ? d : { ...d, activities }));
    onChange(next);
  }

  function updateDayTitle(dayIdx: number, title: string) {
    onChange(days.map((d, i) => (i !== dayIdx ? d : { ...d, title })));
  }

  return (
    <div className="space-y-6">
      {days.map((day, dayIdx) => (
        <div key={day.day} className="rounded-2xl border border-navy-900/10 bg-white overflow-hidden">
          <div className="flex items-center gap-3 bg-navy-900 px-5 py-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
              {day.day}
            </span>
            <input
              value={day.title}
              onChange={(e) => updateDayTitle(dayIdx, e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none focus:ring-1 focus:ring-gold-400 rounded px-1 -mx-1"
              aria-label={`Day ${day.day} title`}
            />
          </div>

          <div className="divide-y divide-navy-900/8">
            {day.activities.map((act, actIdx) => (
              <div key={act.id} className="flex gap-3 p-4 sm:p-5">
                <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => moveActivity(dayIdx, actIdx, -1)}
                    disabled={actIdx === 0}
                    aria-label="Move up"
                    className="text-navy-900/30 hover:text-navy-900 disabled:opacity-20"
                  >
                    <Icon name="ChevronUp" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveActivity(dayIdx, actIdx, 1)}
                    disabled={actIdx === day.activities.length - 1}
                    aria-label="Move down"
                    className="text-navy-900/30 hover:text-navy-900 disabled:opacity-20"
                  >
                    <Icon name="ChevronDown" size={16} />
                  </button>
                </div>

                <input
                  value={act.time}
                  onChange={(e) => updateActivity(dayIdx, actIdx, { time: e.target.value })}
                  className="w-24 shrink-0 rounded-lg bg-sand-100 px-2.5 py-1.5 text-xs font-semibold text-navy-800 text-center h-fit focus:outline-none focus:ring-2 focus:ring-navy-900/20"
                  aria-label="Activity time"
                />

                <div className="flex-1 min-w-0">
                  <input
                    value={act.title}
                    onChange={(e) => updateActivity(dayIdx, actIdx, { title: e.target.value })}
                    className="w-full bg-transparent font-semibold text-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900/20 rounded px-1 -mx-1"
                    aria-label="Activity title"
                  />
                  <textarea
                    value={act.description}
                    onChange={(e) => updateActivity(dayIdx, actIdx, { description: e.target.value })}
                    rows={2}
                    className="mt-1 w-full resize-none bg-transparent text-sm text-ink-soft focus:outline-none focus:ring-1 focus:ring-navy-900/20 rounded px-1 -mx-1"
                    aria-label="Activity description"
                  />
                  <select
                    value={act.category}
                    onChange={(e) => updateActivity(dayIdx, actIdx, { category: e.target.value })}
                    className="mt-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-700 focus:outline-none"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => removeActivity(dayIdx, actIdx)}
                  aria-label="Remove activity"
                  className="shrink-0 h-fit text-navy-900/30 hover:text-red-500 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addActivity(dayIdx)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-navy-900/8 py-3 text-xs font-semibold text-navy-700 hover:bg-sand-100 transition-colors"
          >
            <Icon name="Plus" size={13} />
            Add activity
          </button>
        </div>
      ))}
    </div>
  );
}
