import Link from "next/link";
import { Icon } from "@/components/Icon";
import { GuideCard } from "@/components/GuideCard";
import { guides } from "@/lib/data/guides";

const featured = ["best-beaches-nassau-paradise-island", "local-bahamian-food-guide", "bahamas-travel-tips", "hidden-gems-new-providence"];

export function GuidesTeaser() {
  const items = featured.map((slug) => guides.find((g) => g.slug === slug)!).filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="max-w-xl">
          <p className="eyebrow">Local Knowledge</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
            Guides written for real trips, not brochures.
          </h2>
        </div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 whitespace-nowrap"
        >
          Browse all guides
          <Icon name="ArrowRight" size={15} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((g) => (
          <GuideCard key={g.id} guide={g} />
        ))}
      </div>
    </section>
  );
}
