import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResultsClient } from "./SearchResultsClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Voyanta Concierge for beaches, restaurants, excursions, tours, and cruise-friendly experiences across The Bahamas.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Searching…</div>}>
      <SearchResultsClient />
    </Suspense>
  );
}
