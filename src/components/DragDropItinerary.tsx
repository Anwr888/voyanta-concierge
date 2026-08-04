"use client";

import { useState } from "react";
import { ItineraryDay, ItineraryActivity } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { newActivityId } from "@/lib/itinerary";

interface DragRef {
  dayIdx: number;
  actIdx: number;
}

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

export function DragDropItinerary({
  days,
  onChange,
}: {
  days: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}) {
  const [dragging, setDragging] = useState<DragRef | null>(null);
  const [overDay, setOverDay] = useState<number | null>(null);

  function moveActivity(from: DragRef, toDayIdx: number, toActIdx: number | null) {
    const next = days.map((d) => ({ ...d, activities: [...d.activities] }));
    const [moved] = next[from.dayIdx].activities.splice(from.actIdx, 1);
    if (!moved) return;

    let insertAt = toActIdx;
    if (insertAt === null) {
      insertAt = next[toDayIdx].activities.length;
    } else if (from.dayIdx === toDayIdx && from.actIdx < insertAt) {
      insertAt -= 1;
    }
    next[toDayIdx].activities.splice(insertAt, 0, moved);
    onChange(next);
  }

  function updateActivity(dayIdx: number, actIdx: number, patch: Partial<ItineraryActivity>) {
    const next = days.map((d, i) =>
      i !== dayIdx ? d : { ...d, activities: d.activities.map((a, j) => (j !== actIdx ? a : { ...a, ...patch })) }
    );
    onChange(next);
  }

  function removeActivity(dayIdx: number, actIdx: number) {
    onChange(days.map((d, i) => (i !== dayIdx ? d : { ...d, activities: d.activities.filter((_, j) => j !== actIdx) })));
  }

  function addActivity(dayIdx: number) {
    onChange(
      days.map((d, i) =>
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
                  description: "Drag me anywhere, or edit this text.",
                  category: "Sightseeing",
                  editable: true as const,
                },
              ],
            }
      )
    );
  }

  function addDay() {
    onChange([...days, { day: days.length + 1, title: `Day ${days.length + 1}`, activities: [] }]);
  }

  function removeDay(dayIdx: number) {
    onChange(days.filter((_, i) => i !== dayIdx).map((d, i) => ({ ...d, day: i + 1 })));
  }

  function updateDayTitle(dayIdx: number, title: string) {
    onChange(days.map((d, i) => (i !== dayIdx ? d : { ...d, title })));
  }

  return (
    <div className="space-y-6">
      {days.map((day, dayIdx) => (
        <div
          key={day.day}
          onDragOver={(e) => {
            e.preventDefault();
            setOverDay(dayIdx);
          }}
          onDragLeave={() => setOverDay((v) => (v === dayIdx ? null : v))}
          onDrop={(e) => {
            e.preventDefault();
            setOverDay(null);
            if (dragging) moveActivity(dragging, dayIdx, null);
            setDragging(null);
          }}
          className={`rounded-2xl border bg-white overflow-hidden transition-colors ${
            overDay === dayIdx ? "border-teal-500 ring-2 ring-teal-500/30" : "border-navy-900/10"
          }`}
        >
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
            {days.length > 1 && (
              <button type="button" onClick={() => removeDay(dayIdx)} aria-label="Remove day" className="text-white/50 hover:text-white">
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          <div className="divide-y divide-navy-900/8 min-h-[3rem]">
            {day.activities.map((act, actIdx) => (
              <div
                key={act.id}
                draggable
                onDragStart={() => setDragging({ dayIdx, actIdx })}
                onDragEnd={() => setDragging(null)}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOverDay(null);
                  if (dragging) moveActivity(dragging, dayIdx, actIdx);
                  setDragging(null);
                }}
                className={`flex gap-3 p-4 sm:p-5 cursor-grab active:cursor-grabbing transition-opacity ${
                  dragging?.dayIdx === dayIdx && dragging?.actIdx === actIdx ? "opacity-40" : ""
                }`}
              >
                <div className="pt-1 text-navy-900/25">
                  <Icon name="GripVertical" size={16} />
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
            {day.activities.length === 0 && (
              <p className="p-5 text-center text-xs text-ink-soft/70">Drag an activity here, or add one below.</p>
            )}
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

      <button
        type="button"
        onClick={addDay}
        className="flex w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-navy-900/15 py-4 text-sm font-semibold text-navy-700 hover:bg-white hover:border-navy-900/25 transition-colors"
      >
        <Icon name="Plus" size={15} />
        Add another day
      </button>
    </div>
  );
}
