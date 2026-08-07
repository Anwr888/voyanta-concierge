"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SearchResultRow } from "@/components/search/SearchResultRow";
import { searchAll } from "@/lib/search";

const exampleQueries = [
  "Swimming pigs",
  "Jet skis near Nassau cruise port",
  "Romantic restaurants Paradise Island",
  "Things to do with kids for 4 hours",
];

export function HomeSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => searchAll(query, 6), [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function goToResults(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
      <h2 className="font-display text-2xl sm:text-3xl text-navy-900">
        What would you like to do in The Bahamas?
      </h2>

      <div ref={containerRef} className="relative mt-6 text-left">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goToResults(query);
          }}
          className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-950/10"
        >
          <Icon name="Search" size={18} className="ml-3 shrink-0 text-navy-700/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
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

        {!open && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {exampleQueries.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuery(q);
                  goToResults(q);
                }}
                className="rounded-full border border-navy-900/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-navy-700 hover:bg-white hover:border-navy-900/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {open && query.trim() && (
          <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-2xl shadow-navy-950/15">
            {results.length > 0 ? (
              <>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {results.map((r) => (
                    <SearchResultRow key={`${r.type}-${r.item.id}`} result={r} onNavigate={() => setOpen(false)} />
                  ))}
                </div>
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 border-t border-navy-900/8 py-3 text-sm font-semibold text-teal-700 hover:bg-sand-100 transition-colors"
                >
                  See all results for &quot;{query.trim()}&quot;
                  <Icon name="ArrowRight" size={14} />
                </Link>
              </>
            ) : (
              <div className="p-6 text-center text-sm text-ink-soft">
                No matches yet for &quot;{query.trim()}&quot; — try a broader search, or{" "}
                <Link href="/marketplace" className="font-semibold text-teal-700 hover:text-teal-800" onClick={() => setOpen(false)}>
                  browse the marketplace
                </Link>
                .
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
