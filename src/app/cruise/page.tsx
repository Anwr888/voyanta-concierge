import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { bandLabels } from "@/lib/cruise";
import { CruiseDurationBand } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cruise Passengers",
  description:
    "A dedicated planning experience for cruise passengers with limited time in port, built around a recommended return buffer.",
};

const bands: { id: CruiseDurationBand; note: string }[] = [
  { id: "under-3", note: "Walkable, close-to-port sightseeing and tastings." },
  { id: "3-to-4", note: "A short excursion or a beach stop near the port." },
  { id: "4-to-6", note: "A fuller adventure, beach day, or combination package." },
  { id: "6-plus", note: "The widest selection, including longer or farther experiences." },
];

export default function CruisePage() {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[480px] max-h-[720px] w-full overflow-hidden bg-navy-950">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/nassau-cruise-terminal-1.jpg">
          <source src="/video/hero-cruise-terminal.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/25" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
            <p className="eyebrow eyebrow-on-dark">For Cruise Passengers</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl leading-tight text-white text-balance">
              A few hours ashore, planned to fit.
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
              Tell us your ship&apos;s docking and all-aboard times, and we&apos;ll recommend
              experiences that reasonably fit — with a buffer built in to help you get back.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cruise/planner"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
              >
                Open the Cruise Day Planner
                <Icon name="ArrowRight" size={16} />
              </Link>
              <Link
                href="/cruise/packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Browse cruise packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Why It&apos;s Different</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
            A cruise-day plan isn&apos;t a vacation itinerary.
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Most cruise passengers have a single, fixed window ashore — often just a few hours.
            Voyanta&apos;s Cruise Day Planner is built specifically around that constraint: instead
            of showing you everything Nassau has to offer, it narrows recommendations to what
            reasonably fits your available time, and intentionally leaves room to get back.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bands.map((b) => (
            <div key={b.id} className="rounded-2xl border border-navy-900/10 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <Icon name="Clock" size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg text-navy-900">{bandLabels[b.id]}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow eyebrow-on-dark">The Return Buffer</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">
              We build in time to get back — on purpose.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Instead of scheduling activities right up to your ship&apos;s all-aboard time, the
              planner reserves time at the start of your window (to clear the terminal) and a
              larger buffer at the end (for transportation, walking, and the unexpected). For
              example, a 9:00 AM docking with a 4:30 PM all-aboard time produces a recommended
              activity window of roughly 10:00 AM–2:30 PM.
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              This is a planning aid, not a guarantee. Tours, transportation, and excursions are
              provided by independent local businesses, and actual durations and traffic can vary.
              You&apos;re always responsible for knowing your cruise line&apos;s official
              all-aboard and departure times.
            </p>
          </div>
          <div className="relative h-72 sm:h-96 overflow-hidden rounded-3xl">
            <Image src="/images/nassau-cruise-terminal-2.jpg" alt="Cruise ships docked in Nassau" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <p className="eyebrow">Ready When You Are</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
          Enter your ship&apos;s times and see what fits.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/cruise/planner"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Open the Cruise Day Planner
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
