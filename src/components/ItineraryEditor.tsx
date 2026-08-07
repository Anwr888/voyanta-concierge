"use client";

import { useState } from "react";
import { ItineraryDay, ItineraryActivity, Business, MarketplaceCategoryId } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { newActivityId, recalculateActivityTimes } from "@/lib/itinerary";
import { categories } from "@/lib/data/categories";
import { MarketplacePickerPanel } from "@/components/trip-builder/MarketplacePickerPanel";
import { ActivityTimePicker } from "@/components/ActivityTimePicker";

interface DragRef {
  dayIdx: number;
  actIdx: number;
}

interface PickerTarget {
  dayIdx: number;
  actIdx: number;
}

// Legacy activities (from itinerary templates) only ever stored a free-text
// category label. This finds the real Marketplace category behind that
// label so the picker panel opens pre-scoped to a sensible category instead
// of always starting from "choose a category" for existing rows.
function legacyCategoryId(label: string): MarketplaceCategoryId | "" {
  return categories.find((c) => c.name === label)?.id ?? "";
}

export function ItineraryEditor({
  days,
  onChange,
}: {
  days: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}) {
  const [dragging, setDragging] = useState<DragRef | null>(null);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);

  function updateActivity(dayIdx: number, actIdx: number, patch: Partial<ItineraryActivity>) {
    const next = days.map((d, i) =>
      i !== dayIdx
        ? d
        : { ...d, activities: d.activities.map((a, j) => (j !== actIdx ? a : { ...a, ...patch })) }
    );
    onChange(next);
  }

  // The category pill is the starting point for replacing this exact
  // day/time slot with a real Marketplace experience: clicking it opens the
  // picker panel scoped to this one activity, and choosing a business here
  // writes that business straight into the row.
  function handleBusinessSelect(business: Business) {
    if (!pickerTarget) return;
    updateActivity(pickerTarget.dayIdx, pickerTarget.actIdx, {
      title: business.name,
      description: business.shortDescription,
      category: categories.find((c) => c.id === business.category)?.name ?? business.category,
      marketplaceCategoryId: business.category,
      marketplaceListingId: business.slug,
      provider: business.name,
      location: `${business.area}, ${business.island}`,
    });
    setPickerTarget(null);
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

  // Reorders within a single day only (drag never crosses days here) — drop
  // targeting `toActIdx === null` appends to the end of that day's list.
  // Times are then recalculated for that day from its new order, same as
  // the Trip Builder: whichever activity lands first gets a morning time,
  // and the rest progress chronologically from there.
  function moveActivity(dayIdx: number, fromActIdx: number, toActIdx: number | null) {
    const activities = [...days[dayIdx].activities];
    const [moved] = activities.splice(fromActIdx, 1);
    if (!moved) return;

    // The "insert before this index" adjustment only applies when
    // `toActIdx` is a real target position from the pre-removal array —
    // append-to-end's `activities.length` is already computed from the
    // post-removal array and must not be shifted again, or the activity
    // lands one slot before the actual end instead of at it.
    let insertAt: number;
    if (toActIdx === null) {
      insertAt = activities.length;
    } else {
      insertAt = fromActIdx < toActIdx ? toActIdx - 1 : toActIdx;
    }
    activities.splice(insertAt, 0, moved);

    const recalculated = recalculateActivityTimes(activities);
    const next = days.map((d, i) => (i !== dayIdx ? d : { ...d, activities: recalculated }));
    onChange(next);
  }

  function updateDayTitle(dayIdx: number, title: string) {
    onChange(days.map((d, i) => (i !== dayIdx ? d : { ...d, title })));
  }

  const pickerDay = pickerTarget ? days[pickerTarget.dayIdx] : undefined;
  const pickerActivity = pickerTarget ? pickerDay?.activities[pickerTarget.actIdx] : undefined;

  return (
    <div className="space-y-6">
      {days.map((day, dayIdx) => (
        <div
          key={day.day}
          onDragOver={(e) => {
            if (dragging?.dayIdx !== dayIdx) return;
            e.preventDefault();
          }}
          onDrop={(e) => {
            if (dragging?.dayIdx !== dayIdx) return;
            e.preventDefault();
            moveActivity(dayIdx, dragging.actIdx, null);
            setDragging(null);
          }}
          className="rounded-2xl border border-navy-900/10 bg-white overflow-hidden"
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
          </div>

          <div className="divide-y divide-navy-900/8">
            {day.activities.map((act, actIdx) => (
              <div
                key={act.id}
                draggable
                onDragStart={() => setDragging({ dayIdx, actIdx })}
                onDragEnd={() => setDragging(null)}
                onDragOver={(e) => {
                  if (dragging?.dayIdx !== dayIdx) return;
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  if (dragging?.dayIdx !== dayIdx) return;
                  e.preventDefault();
                  e.stopPropagation();
                  moveActivity(dayIdx, dragging.actIdx, actIdx);
                  setDragging(null);
                }}
                className={`flex gap-3 p-4 sm:p-5 cursor-grab active:cursor-grabbing transition-opacity ${
                  dragging?.dayIdx === dayIdx && dragging?.actIdx === actIdx ? "opacity-40" : ""
                }`}
              >
                <div className="pt-1 text-navy-900/25">
                  <Icon name="GripVertical" size={16} />
                </div>

                <ActivityTimePicker
                  value={act.time}
                  onChange={(time) => updateActivity(dayIdx, actIdx, { time })}
                />

                <div className="flex-1 min-w-0">
                  <input
                    value={act.title}
                    onChange={(e) => updateActivity(dayIdx, actIdx, { title: e.target.value })}
                    className="w-full bg-transparent font-semibold text-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900/20 rounded px-1 -mx-1"
                    aria-label="Activity title"
                  />
                  {act.provider && act.location && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                      <Icon name="MapPin" size={11} className="shrink-0" />
                      {act.provider} • {act.location}
                    </p>
                  )}
                  <textarea
                    value={act.description}
                    onChange={(e) => updateActivity(dayIdx, actIdx, { description: e.target.value })}
                    rows={2}
                    className="mt-1 w-full resize-none bg-transparent text-sm text-ink-soft focus:outline-none focus:ring-1 focus:ring-navy-900/20 rounded px-1 -mx-1"
                    aria-label="Activity description"
                  />
                  <button
                    type="button"
                    onClick={() => setPickerTarget({ dayIdx, actIdx })}
                    aria-label="Choose a category and Marketplace experience for this activity"
                    aria-expanded={pickerTarget?.dayIdx === dayIdx && pickerTarget?.actIdx === actIdx}
                    className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-700 hover:bg-teal-500/20 transition-colors"
                  >
                    {act.category || "Choose a category…"}
                    <Icon
                      name="ChevronDown"
                      size={12}
                      className={`transition-transform ${
                        pickerTarget?.dayIdx === dayIdx && pickerTarget?.actIdx === actIdx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
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

      <MarketplacePickerPanel
        open={pickerTarget !== null}
        slotLabel={pickerDay && pickerActivity ? `Day ${pickerDay.day} · ${pickerActivity.time}` : ""}
        initialCategoryId={
          pickerActivity ? pickerActivity.marketplaceCategoryId ?? legacyCategoryId(pickerActivity.category) : ""
        }
        onClose={() => setPickerTarget(null)}
        onSelect={handleBusinessSelect}
      />
    </div>
  );
}
