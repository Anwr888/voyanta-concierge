import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";

export function BusinessCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-3xl">
        <Image src="/images/nassau-city-aerial-2.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-950/40" />
        <div className="relative px-6 py-14 sm:px-14 sm:py-16 max-w-xl">
          <p className="eyebrow eyebrow-on-dark">For Local Businesses</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">
            Reach travelers already planning their Bahamas trip.
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Create a free listing, or upgrade for featured placement, marketing tools, and lead
            insights. Join the local providers travelers discover through Voyanta.
          </p>
          <Link
            href="/list-your-business"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-white/90 transition-colors"
          >
            List your business
            <Icon name="ArrowRight" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
