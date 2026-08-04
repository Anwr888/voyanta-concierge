"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ReturnBufferTimeline } from "@/components/ReturnBufferTimeline";
import { CruisePackageCard } from "@/components/CruisePackageCard";
import { BusinessCard } from "@/components/BusinessCard";
import { computeReturnBuffer, recommendPackages } from "@/lib/cruise";
import { businesses } from "@/lib/data/businesses";

const budgetMaxMap: Record<string, number> = {
  "budget-friendly": 100,
  moderate: 220,
  premium: 420,
  luxury: Infinity,
};

export function ResultsClient() {
  const params = useSearchParams();

  const cruiseLine = params.get("cruiseLine") ?? "";
  const ship = params.get("ship") ?? "";
  const dockingTime = params.get("dockingTime") ?? "09:00";
  const allAboardTime = params.get("allAboardTime") ?? "16:30";
  const adults = Number(params.get("adults") ?? 2);
  const children = Number(params.get("children") ?? 0);
  const budget = params.get("budget") ?? "moderate";
  const interests = (params.get("interests") ?? "").split(",").filter(Boolean);

  const buffer = computeReturnBuffer(dockingTime, allAboardTime);

  if (!buffer.isValid) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-navy-900">That time range doesn&apos;t quite work.</h1>
        <p className="mt-3 text-ink-soft">
          Your all-aboard time should be after your docking time. Head back and double-check your
          ship&apos;s schedule.
        </p>
        <Link href="/cruise/planner" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white">
          <Icon name="ArrowLeft" size={14} /> Back to planner
        </Link>
      </div>
    );
  }

  const recommended = recommendPackages({
    buffer,
    interests,
    budgetMax: budgetMaxMap[budget] ?? Infinity,
    familyFriendly: children > 0,
  });

  const nearbyActivities = businesses
    .filter((b) => b.distanceFromCruisePortMinutes !== undefined)
    .sort((a, b) => (a.distanceFromCruisePortMinutes ?? 999) - (b.distanceFromCruisePortMinutes ?? 999))
    .slice(0, 6);

  const tooLittleTime = buffer.windowMinutes < 60;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="eyebrow">Your Cruise Day</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">
            {ship || cruiseLine || "Your Ship"} in Nassau
          </h1>
          <p className="mt-2 text-ink-soft">
            {adults} adult{adults !== 1 ? "s" : ""}
            {children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}
            {cruiseLine ? ` · ${cruiseLine}` : ""}
          </p>
        </div>
        <Link href="/cruise/planner" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-navy-900">
          <Icon name="RotateCcw" size={14} />
          Edit details
        </Link>
      </div>

      <div className="mt-8">
        <ReturnBufferTimeline buffer={buffer} dockingTime={dockingTime} />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-400/40 bg-gold-300/10 p-4 text-sm text-navy-900">
        <Icon name="Info" size={18} className="mt-0.5 shrink-0 text-gold-600" />
        <p>
          This recommended window is a planning aid, not a guarantee of return time. Activities are
          provided by independent local businesses, and actual durations and traffic can vary —
          you&apos;re responsible for knowing your ship&apos;s official all-aboard time.
        </p>
      </div>

      {tooLittleTime && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <Icon name="TriangleAlert" size={18} className="mt-0.5 shrink-0 text-red-500" />
          <p>
            Your window is quite tight. We&apos;d recommend staying very close to the port —
            consider a short walk into downtown Nassau rather than a booked excursion today.
          </p>
        </div>
      )}

      <section className="mt-14">
        <h2 className="font-display text-2xl text-navy-900">Recommended cruise packages</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Matched to your available time{interests.length ? ", interests," : ""} and budget.
        </p>
        {recommended.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((p) => (
              <CruisePackageCard key={p.id} pkg={p} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 text-sm text-ink-soft">
            No packaged experiences fit your exact window — browse individual activities near the
            port below instead.
          </p>
        )}
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy-900">Individual activities near the port</h2>
          <Link href="/marketplace" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
            See all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nearbyActivities.map((b, i) => (
            <BusinessCard key={b.id} business={b} seed={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
