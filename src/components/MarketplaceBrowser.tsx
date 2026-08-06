"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/Icon";
import { BusinessCard } from "@/components/BusinessCard";
import { businesses } from "@/lib/data/businesses";
import { categories } from "@/lib/data/categories";
import { islands } from "@/lib/data/islands";
import { Business, MarketplaceCategoryId, TravelerTag } from "@/lib/types";
import { CRUISE_FRIENDLY_MAX_MINUTES } from "@/lib/format";

const MarketplaceMap = dynamic(() => import("@/components/map/MarketplaceMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-navy-900/5 text-sm text-ink-soft">
      Loading map…
    </div>
  ),
});

type ViewMode = "list" | "map";

const tagOptions: { id: TravelerTag; label: string }[] = [
  { id: "family-friendly", label: "Family-Friendly" },
  { id: "luxury", label: "Luxury" },
  { id: "outdoor", label: "Outdoor" },
  { id: "water-activities", label: "Water Activities" },
  { id: "kid-friendly", label: "Kid-Friendly" },
  { id: "pet-friendly", label: "Pet-Friendly" },
  { id: "accessible", label: "Accessible" },
];

type SortId = "recommended" | "rating" | "price-low" | "price-high";

export function MarketplaceBrowser({
  initialCategory = "all",
  lockCategory = false,
}: {
  initialCategory?: MarketplaceCategoryId | "all";
  lockCategory?: boolean;
}) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [island, setIsland] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4);
  const [nearPort, setNearPort] = useState(false);
  const [tags, setTags] = useState<TravelerTag[]>([]);
  const [sort, setSort] = useState<SortId>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("list");

  function toggleTag(tag: TravelerTag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const results = useMemo(() => {
    let list: Business[] = businesses.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (island !== "all" && b.island !== island) return false;
      // A business with no verified rating can't be confirmed to meet a
      // minimum-rating filter, so it's excluded rather than assumed to pass.
      if (minRating > 0 && (b.rating === undefined || b.rating < minRating)) return false;
      // Same logic for price: unknown price range is excluded once the
      // filter is actually restricting (maxPrice < 4 = "all prices").
      if (maxPrice < 4 && (b.priceLevel === undefined || b.priceLevel > maxPrice)) return false;
      if (nearPort && (b.distanceFromCruisePortMinutes ?? 999) > CRUISE_FRIENDLY_MAX_MINUTES) return false;
      if (tags.length && !tags.every((t) => b.tags.includes(t))) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !b.name.toLowerCase().includes(q) &&
          !b.subcategory.toLowerCase().includes(q) &&
          !b.area.toLowerCase().includes(q) &&
          !b.shortDescription.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    // Businesses without a verified rating/price always sort to the end,
    // regardless of sort direction, rather than being coerced to a
    // fabricated value.
    const compareDefined = (x: number | undefined, y: number | undefined, dir: 1 | -1) => {
      if (x === undefined && y === undefined) return 0;
      if (x === undefined) return 1;
      if (y === undefined) return -1;
      return dir * (x - y);
    };

    list = [...list].sort((a, b) => {
      if (sort === "rating") return compareDefined(a.rating, b.rating, -1);
      if (sort === "price-low") return compareDefined(a.priceLevel, b.priceLevel, 1);
      if (sort === "price-high") return compareDefined(a.priceLevel, b.priceLevel, -1);
      // recommended: featured first, then rating
      if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
      return compareDefined(a.rating, b.rating, -1);
    });

    return list;
  }, [category, island, minRating, maxPrice, nearPort, tags, query, sort]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      {/* Filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="lg:hidden mb-3 inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-4 py-2.5 text-sm font-semibold text-navy-800"
        >
          <Icon name="SlidersHorizontal" size={14} />
          Filters {filtersOpen ? "▲" : "▼"}
        </button>
        <div className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-6 rounded-2xl border border-navy-900/10 bg-white p-5`}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Search</label>
            <div className="mt-2 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings..."
                className="w-full rounded-xl border border-navy-900/15 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20"
              />
            </div>
          </div>

          {!lockCategory && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Island</label>
            <select
              value={island}
              onChange={(e) => setIsland(e.target.value)}
              className="mt-2 w-full rounded-xl border border-navy-900/15 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20"
            >
              <option value="all">All Islands</option>
              {islands.map((i) => (
                <option key={i.slug} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Minimum rating</label>
            <div className="mt-2 flex gap-2">
              {[0, 4, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
                    minRating === r ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 text-navy-800 hover:bg-sand-100"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Max price</label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setMaxPrice(p)}
                  className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold border transition-colors ${
                    maxPrice === p ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 text-navy-800 hover:bg-sand-100"
                  }`}
                >
                  {"$".repeat(p)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-navy-900 cursor-pointer">
            <input
              type="checkbox"
              checked={nearPort}
              onChange={(e) => setNearPort(e.target.checked)}
              className="h-4 w-4 rounded border-navy-900/30 accent-navy-900"
            />
            Near the cruise port (≤{CRUISE_FRIENDLY_MAX_MINUTES} min)
          </label>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Traveler tags</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tagOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
                    tags.includes(t.id) ? "border-teal-600 bg-teal-500/10 text-teal-700" : "border-navy-900/15 text-navy-800 hover:bg-sand-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            <strong className="text-navy-900">{results.length}</strong> listing{results.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-navy-900/15 p-0.5">
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  view === "list" ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-sand-100"
                }`}
              >
                <Icon name="ListChecks" size={13} />
                List
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                aria-pressed={view === "map"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  view === "map" ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-sand-100"
                }`}
              >
                <Icon name="MapPin" size={13} />
                Map
              </button>
            </div>
            {view === "list" && (
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="rounded-full border border-navy-900/15 px-3.5 py-2 text-xs font-semibold text-navy-800 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            )}
          </div>
        </div>

        {view === "map" ? (
          <div className="relative isolate z-0 mt-5 h-[420px] sm:h-[560px] overflow-hidden rounded-2xl border border-navy-900/10">
            <MarketplaceMap businesses={results} />
          </div>
        ) : results.length ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {results.map((b, i) => (
              <BusinessCard key={b.id} business={b} seed={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-navy-900/10 bg-white p-10 text-center">
            <p className="font-display text-lg text-navy-900">No listings match those filters.</p>
            <p className="mt-1 text-sm text-ink-soft">Try widening your price range or clearing a filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
