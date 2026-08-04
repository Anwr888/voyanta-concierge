"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { events } from "@/lib/data/events";
import { EventCategory } from "@/lib/types";

const categories: EventCategory[] = ["Festival", "Concert", "Sporting Event", "Cultural Event", "Holiday Celebration", "Farmers Market"];

export default function EventsPage() {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const list = category === "all" ? events : events.filter((e) => e.category === category);
    return [...list].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [category]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Events Calendar</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
        Festivals, culture, and celebrations.
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        From Junkanoo parades to farmers markets — plan your trip around what&apos;s happening.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterPill active={category === "all"} onClick={() => setCategory("all")} label="All Events" />
        {categories.map((c) => (
          <FilterPill key={c} active={category === c} onClick={() => setCategory(c)} label={c} />
        ))}
      </div>

      <div className="mt-10 space-y-5">
        {filtered.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
        {filtered.length === 0 && <p className="text-center text-ink-soft py-10">No events in this category right now.</p>}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
        active ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 text-navy-800 hover:bg-sand-100"
      }`}
    >
      {label}
    </button>
  );
}
