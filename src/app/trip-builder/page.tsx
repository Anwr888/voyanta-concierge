import { Suspense } from "react";
import type { Metadata } from "next";
import { TripBuilderClient } from "./TripBuilderClient";

export const metadata: Metadata = {
  title: "Trip Builder",
  description: "Drag, drop, and fine-tune your saved Bahamas itinerary, then share or print it.",
};

export default function TripBuilderPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-24 text-center text-ink-soft">Loading your trip…</div>}>
      <TripBuilderClient />
    </Suspense>
  );
}
