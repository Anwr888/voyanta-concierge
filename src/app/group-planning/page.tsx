import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Group Planning",
  description: "Invite friends, vote on activities, split expenses, and coordinate schedules for group Bahamas trips.",
};

const features = [
  { icon: "UserPlus", title: "Invite friends", body: "Bring everyone into the same trip so the plan reflects the whole group, not just one person." },
  { icon: "Vote", title: "Vote on activities", body: "Let the group weigh in on excursions, restaurants, and free days before they're locked in." },
  { icon: "CircleDollarSign", title: "Split expenses", body: "Keep shared costs — villas, charters, dinners — organized and easy to divide fairly." },
  { icon: "MessageSquare", title: "Suggest restaurants", body: "Anyone in the group can drop in ideas for the planner to consider." },
  { icon: "CalendarDays", title: "Coordinate schedules", body: "See everyone's arrival and departure windows alongside the day-by-day plan." },
  { icon: "ListChecks", title: "Track payments", body: "Know who's paid for what, at a glance." },
];

const useCases = ["Bachelor & bachelorette trips", "Family reunions", "Destination weddings", "Group vacations", "Corporate retreats"];

export default function GroupPlanningPage() {
  return (
    <div>
      <section className="bg-navy-950 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="eyebrow eyebrow-on-dark">Group Planning</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-white">
            Plan a Bahamas trip together, not over email threads.
          </h1>
          <p className="mt-5 text-white/70 leading-relaxed max-w-2xl mx-auto">
            Built for bachelor trips, family reunions, destination weddings, and any vacation
            where more than one person has an opinion about the itinerary.
          </p>
          <Link
            href="/plan"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
          >
            Start a group trip
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-navy-900/10 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <Icon name={f.icon} size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg text-navy-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">See It In Action</p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl text-navy-900">
              Everyone votes, the plan updates.
            </h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              An illustrative look at how activity voting fits into a shared itinerary — options
              your group is deciding between, side by side.
            </p>
            <p className="mt-4 text-xs text-ink-soft/70">
              Group accounts and live voting are on our roadmap. Today, start your plan with the{" "}
              <Link href="/plan" className="text-teal-700 font-semibold">Vacation Planner</Link>{" "}
              and share it with your group using the{" "}
              <Link href="/trip-builder" className="text-teal-700 font-semibold">Trip Builder</Link>&apos;s share link.
            </p>
          </div>

          <div className="rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Day 3 — Undecided</p>
            <div className="mt-3 space-y-3">
              {[
                { name: "Jet Skiing at Cabbage Beach", votes: 5 },
                { name: "Blue Water Charters Boat Day", votes: 3 },
              ].map((opt) => (
                <div key={opt.name} className="rounded-xl border border-navy-900/8 p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900">{opt.name}</p>
                    <span className="text-xs font-semibold text-teal-700">{opt.votes} votes</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-navy-900/8">
                    <div className="h-full rounded-full bg-teal-500" style={{ width: `${(opt.votes / 8) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <p className="eyebrow">Perfect For</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {useCases.map((u) => (
            <span key={u} className="rounded-full bg-navy-900/5 px-4 py-2 text-sm font-medium text-navy-800">
              {u}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
