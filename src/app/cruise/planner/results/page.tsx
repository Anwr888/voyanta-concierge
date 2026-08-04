import { Suspense } from "react";
import type { Metadata } from "next";
import { ResultsClient } from "./ResultsClient";

export const metadata: Metadata = {
  title: "Your Cruise Day Plan",
};

export default function CruisePlannerResultsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Building your day…</div>}>
      <ResultsClient />
    </Suspense>
  );
}
