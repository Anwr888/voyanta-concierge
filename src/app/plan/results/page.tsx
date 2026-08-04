import { Suspense } from "react";
import type { Metadata } from "next";
import { ResultsClient } from "./ResultsClient";

export const metadata: Metadata = {
  title: "Your Itinerary",
};

export default function PlanResultsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Building your itinerary…</div>}>
      <ResultsClient />
    </Suspense>
  );
}
