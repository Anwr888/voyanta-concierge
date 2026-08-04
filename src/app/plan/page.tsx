"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { OptionTile } from "@/components/OptionTile";
import { NumberStepper } from "@/components/NumberStepper";
import { islands } from "@/lib/data/islands";
import { vacationTypes, budgetOptions } from "@/lib/data/quiz";

const steps = ["Island", "Dates & Travelers", "Budget", "Vacation Style", "Review"];

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [island, setIsland] = useState<string>("new-providence-nassau");
  const [startDate, setStartDate] = useState("");
  const [nights, setNights] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState<string>("moderate");
  const [vacationType, setVacationType] = useState<string>("Family");

  const canContinue = useMemo(() => {
    if (step === 0) return !!island;
    if (step === 2) return !!budget;
    if (step === 3) return !!vacationType;
    return true;
  }, [step, island, budget, vacationType]);

  function goNext() {
    if (step < steps.length - 1) setStep(step + 1);
  }
  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  function generatePlan() {
    const params = new URLSearchParams({
      island,
      startDate,
      nights: String(nights),
      adults: String(adults),
      children: String(children),
      budget,
      vacationType,
    });
    router.push(`/plan/results?${params.toString()}`);
  }

  const selectedIsland = islands.find((i) => i.slug === island);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Vacation Planner</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
        Let&apos;s plan your Bahamas trip.
      </h1>
      <p className="mt-3 text-ink-soft max-w-xl">
        A few quick questions and we&apos;ll put together a personalized, fully editable
        itinerary — no account required.
      </p>

      {/* Progress */}
      <div className="mt-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-gold-500" : "bg-navy-900/10"}`} />
            <span className={`mt-1.5 hidden sm:block text-[11px] font-medium ${i === step ? "text-navy-900" : "text-ink-soft/60"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-navy-900/10 bg-white p-6 sm:p-8 shadow-sm">
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">Which island are you visiting?</h2>
            <p className="mt-1 text-sm text-ink-soft">Not sure yet? Nassau is the most popular starting point.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {islands.map((i) => (
                <OptionTile
                  key={i.slug}
                  selected={island === i.slug}
                  onClick={() => setIsland(i.slug)}
                  label={i.name}
                  sublabel={i.tagline}
                />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">When, and with how many people?</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-navy-900">Travel start date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
                />
              </label>
              <div>
                <span className="text-sm font-semibold text-navy-900">Trip length</span>
                <div className="mt-2">
                  <NumberStepper label="Nights" value={nights} onChange={setNights} min={1} max={21} />
                </div>
              </div>
              <NumberStepper label="Adults" value={adults} onChange={setAdults} min={1} max={16} />
              <NumberStepper label="Children" value={children} onChange={setChildren} min={0} max={12} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">What&apos;s your budget?</h2>
            <p className="mt-1 text-sm text-ink-soft">Approximate spend per day, excluding flights.</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {budgetOptions.map((b) => (
                <OptionTile
                  key={b.id}
                  selected={budget === b.id}
                  onClick={() => setBudget(b.id)}
                  icon={b.icon}
                  label={b.label}
                  sublabel={b.range}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">What type of vacation?</h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {vacationTypes.map((v) => (
                <OptionTile
                  key={v.id}
                  selected={vacationType === v.id}
                  onClick={() => setVacationType(v.id)}
                  icon={v.icon}
                  label={v.label}
                  sublabel={v.blurb}
                />
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">Review your trip</h2>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                ["Island", selectedIsland?.name ?? "—"],
                ["Dates", startDate ? `${startDate} · ${nights} nights` : `${nights} nights (dates flexible)`],
                ["Travelers", `${adults} adult${adults !== 1 ? "s" : ""}${children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}`],
                ["Budget", budgetOptions.find((b) => b.id === budget)?.label ?? "—"],
                ["Vacation style", vacationType],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-xl bg-sand-100 px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</dt>
                  <dd className="mt-1 font-medium text-navy-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-navy-800 disabled:opacity-30 hover:bg-sand-100 transition-colors"
          >
            <Icon name="ArrowLeft" size={15} />
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-navy-800 transition-colors"
            >
              Continue
              <Icon name="ArrowRight" size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={generatePlan}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
            >
              Build my itinerary
              <Icon name="Sparkles" size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
