import Link from "next/link";
import { Icon } from "@/components/Icon";

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] max-h-[900px] w-full overflow-hidden bg-navy-950">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/baha-mar-hero-poster.jpg"
      >
        <source src="/video/hero-bahamar.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/15 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-40 sm:pb-44">
          <p className="eyebrow eyebrow-on-dark">Your Bahamas Vacation, Expertly Planned</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-6xl leading-[1.05] text-white text-balance">
            The Bahamas, planned around <em className="italic text-gold-300">your</em> time.
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
            From five-day island getaways to a single afternoon in port, Voyanta Concierge builds
            a personalized plan and connects you with trusted local providers — down to the hour.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors shadow-lg shadow-navy-950/20"
            >
              Start Planning My Vacation
              <Icon name="ArrowRight" size={16} />
            </Link>
            <Link
              href="/cruise"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-sand-100 transition-colors shadow-lg shadow-navy-950/20"
            >
              <Icon name="Ship" size={16} className="text-navy-800" />
              I&apos;m Arriving by Cruise Ship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
