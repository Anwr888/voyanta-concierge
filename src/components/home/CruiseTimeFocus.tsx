import Link from "next/link";
import { Icon } from "@/components/Icon";

const windows = [
  {
    duration: "2–3 Hours",
    icon: "Landmark",
    tags: ["Nassau highlights", "Local food", "Shopping", "Historical sites"],
  },
  {
    duration: "3–4 Hours",
    icon: "Umbrella",
    tags: ["Beach + lunch", "Island tour", "Food + history"],
  },
  {
    duration: "4–6 Hours",
    icon: "Waves",
    tags: ["Longer excursions", "Beach experiences", "Water activities"],
  },
] as const;

export function CruiseTimeFocus() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="overflow-hidden rounded-3xl border border-teal-500/15 bg-teal-500/5 px-6 py-12 sm:px-12 sm:py-14">
        <div className="max-w-2xl">
          <p className="eyebrow">For Cruise Passengers</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
            Only in Nassau for the day?
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Enter your ship&apos;s arrival and official all-aboard time, and we&apos;ll surface
            activities that reasonably fit the hours you actually have ashore.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {windows.map((w) => (
            <div key={w.duration} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-900/5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <Icon name={w.icon} size={20} />
              </div>
              <h3 className="mt-4 font-display text-xl text-navy-900">{w.duration}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {w.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-navy-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/cruise/planner"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
          >
            Plan My Cruise Day
            <Icon name="ArrowRight" size={16} />
          </Link>
          <p className="text-xs text-ink-soft leading-relaxed max-w-md">
            Voyanta provides planning guidance and suggested time buffers — not a guarantee of
            return times. You&apos;re always responsible for confirming your ship&apos;s official
            all-aboard schedule.
          </p>
        </div>
      </div>
    </section>
  );
}
