"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { BusinessCard } from "@/components/BusinessCard";
import { CruisePackageCard } from "@/components/CruisePackageCard";
import { GuideCard } from "@/components/GuideCard";
import { searchAll } from "@/lib/search";

export function SearchResultsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState(q);

  const results = useMemo(() => searchAll(q, 60), [q]);
  const businessResults = results.filter((r) => r.type === "business");
  const packageResults = results.filter((r) => r.type === "package");
  const guideResults = results.filter((r) => r.type === "guide");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Search Voyanta</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
        {q ? (
          <>
            Results for &quot;{q}&quot;
          </>
        ) : (
          "What would you like to do in The Bahamas?"
        )}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = draft.trim();
          if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        }}
        className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border border-navy-900/10 bg-white p-2 shadow-sm"
      >
        <Icon name="Search" size={18} className="ml-3 shrink-0 text-navy-700/60" />
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search beaches, restaurants, excursions, tours..."
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm sm:text-base text-navy-900 placeholder:text-ink-soft/70 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
        >
          Search
        </button>
      </form>

      {q && (
        <p className="mt-4 text-sm text-ink-soft">
          <strong className="text-navy-900">{results.length}</strong> result{results.length !== 1 ? "s" : ""} across
          listings, cruise packages, and guides.
        </p>
      )}

      {q && results.length === 0 && (
        <div className="mt-10 rounded-2xl border border-navy-900/10 bg-white p-10 text-center">
          <p className="font-display text-lg text-navy-900">No results for &quot;{q}&quot;.</p>
          <p className="mt-1 text-sm text-ink-soft">Try a broader term, or browse instead.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Browse the marketplace
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
            >
              Browse guides
            </Link>
          </div>
        </div>
      )}

      {businessResults.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-navy-900">Businesses &amp; Listings</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {businessResults.map((r, i) =>
              r.type === "business" ? <BusinessCard key={r.item.id} business={r.item} seed={i} /> : null
            )}
          </div>
        </section>
      )}

      {packageResults.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-navy-900">Cruise Packages</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {packageResults.map((r) => (r.type === "package" ? <CruisePackageCard key={r.item.id} pkg={r.item} /> : null))}
          </div>
        </section>
      )}

      {guideResults.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-navy-900">Guides</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {guideResults.map((r) => (r.type === "guide" ? <GuideCard key={r.item.id} guide={r.item} /> : null))}
          </div>
        </section>
      )}
    </div>
  );
}
