"use client";

import { useMemo, useState } from "react";
import { GuideCard } from "@/components/GuideCard";
import { guides, guideCategories } from "@/lib/data/guides";

export default function GuidesPage() {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => (category === "all" ? guides : guides.filter((g) => g.category === category)), [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Local Guides</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
        Written for real trips, not brochures.
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Beaches, food, hidden gems, and practical tips from people who actually know the islands.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterPill active={category === "all"} onClick={() => setCategory("all")} label="All Guides" />
        {guideCategories.map((c) => (
          <FilterPill key={c} active={category === c} onClick={() => setCategory(c)} label={c} />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g) => (
          <GuideCard key={g.id} guide={g} />
        ))}
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
