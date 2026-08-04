import type { Metadata } from "next";
import { MarketplaceBrowser } from "@/components/MarketplaceBrowser";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse trusted, independent Bahamian businesses across accommodation, tours, water activities, food, and more.",
};

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">The Marketplace</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
        Every trusted local provider, in one place.
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Every listing is an independent, locally owned Bahamian business. Voyanta Concierge helps
        you discover and plan with them — it doesn&apos;t operate these services directly.
      </p>

      <div className="mt-10">
        <MarketplaceBrowser />
      </div>
    </div>
  );
}
