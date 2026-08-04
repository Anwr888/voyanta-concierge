import Link from "next/link";
import { Icon } from "@/components/Icon";
import { BusinessCard } from "@/components/BusinessCard";
import { featuredBusinesses } from "@/lib/data/businesses";

export function FeaturedListings() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="max-w-xl">
          <p className="eyebrow">Featured This Month</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
            Trusted local providers, highly rated.
          </h2>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 whitespace-nowrap"
        >
          See all listings
          <Icon name="ArrowRight" size={15} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredBusinesses.slice(0, 4).map((b, i) => (
          <BusinessCard key={b.id} business={b} seed={i} />
        ))}
      </div>
    </section>
  );
}
