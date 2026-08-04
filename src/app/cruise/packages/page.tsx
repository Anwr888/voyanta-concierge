"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CruisePackageCard } from "@/components/CruisePackageCard";
import { cruisePackages } from "@/lib/data/packages";
import { bandLabels } from "@/lib/cruise";
import { CruiseDurationBand, CruisePackageCategory } from "@/lib/types";

const categories: CruisePackageCategory[] = [
  "Nassau Highlights",
  "Beach Escape",
  "Taste of The Bahamas",
  "Adventure Day",
  "Family Cruise Day",
  "Luxury Cruise Day",
];

const bands: CruiseDurationBand[] = ["under-3", "3-to-4", "4-to-6", "6-plus"];

export default function CruisePackagesPage() {
  const [category, setCategory] = useState<string>("all");
  const [band, setBand] = useState<string>("all");

  const filtered = useMemo(
    () =>
      cruisePackages.filter(
        (p) => (category === "all" || p.category === category) && (band === "all" || p.durationBand === band)
      ),
    [category, band]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow">Cruise Packages</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
            Curated cruise-day experiences.
          </h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Each package lists a recommended amount of available port time — pick the one that
            fits your ship&apos;s schedule, or use the{" "}
            <Link href="/cruise/planner" className="text-teal-600 font-semibold hover:text-teal-700">
              Cruise Day Planner
            </Link>{" "}
            for a personalized match.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterPill active={category === "all"} onClick={() => setCategory("all")} label="All Categories" />
        {categories.map((c) => (
          <FilterPill key={c} active={category === c} onClick={() => setCategory(c)} label={c} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterPill active={band === "all"} onClick={() => setBand("all")} label="Any Port Time" />
        {bands.map((b) => (
          <FilterPill key={b} active={band === b} onClick={() => setBand(b)} label={bandLabels[b]} icon="Clock" />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <CruisePackageCard key={p.id} pkg={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-soft">No packages match those filters yet.</p>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
        active ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 text-navy-800 hover:bg-sand-100"
      }`}
    >
      {icon && <Icon name={icon} size={12} />}
      {label}
    </button>
  );
}
