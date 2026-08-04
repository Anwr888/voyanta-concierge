import Link from "next/link";
import { Icon } from "@/components/Icon";

export function CruiseCallout() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 sm:px-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow eyebrow-on-dark">For Cruise Passengers</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">
              We build in time to get back to the ship.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed max-w-md">
              Enter your docking and all-aboard times and we&apos;ll recommend a shorter activity
              window — leaving room for transportation, walking, and the unexpected. It&apos;s a
              planning aid, not a guarantee: you&apos;re always responsible for knowing your
              ship&apos;s official return time.
            </p>
            <Link
              href="/cruise/planner"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
            >
              Try the Cruise Day Planner
              <Icon name="ArrowRight" size={15} />
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between text-xs font-semibold text-white/60">
              <span className="flex items-center gap-1.5">
                <Icon name="Anchor" size={13} /> Docks 9:00 AM
              </span>
              <span className="flex items-center gap-1.5">
                All-aboard 4:30 PM <Icon name="Ship" size={13} />
              </span>
            </div>
            <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-white/10" style={{ width: "13%" }} />
              <div className="h-full bg-teal-400" style={{ width: "60%" }} />
              <div className="h-full bg-gold-500/70" style={{ width: "27%" }} />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-400" /> Recommended activity window: 10:00 AM–2:30 PM
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold-500/70" /> Return buffer: ~2 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
