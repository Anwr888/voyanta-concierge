"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { OptionTile } from "@/components/OptionTile";
import { NumberStepper } from "@/components/NumberStepper";
import { cruiseLines, cruiseInterests } from "@/lib/data/cruise-options";
import { budgetOptions } from "@/lib/data/quiz";

export default function CruisePlannerPage() {
  const router = useRouter();

  const [cruiseLine, setCruiseLine] = useState<string>(cruiseLines[0]);
  const [ship, setShip] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [dockingTime, setDockingTime] = useState("09:00");
  const [allAboardTime, setAllAboardTime] = useState("16:30");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function handleSubmit() {
    if (dockingTime >= allAboardTime) {
      setError("All-aboard time should be after your docking time.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      cruiseLine,
      ship,
      arrivalDate,
      dockingTime,
      allAboardTime,
      adults: String(adults),
      children: String(children),
      budget,
      interests: interests.join(","),
    });
    router.push(`/cruise/planner/results?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Cruise Day Planner</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
        Tell us about your day in port.
      </h1>
      <p className="mt-3 text-ink-soft max-w-xl">
        We&apos;ll use your ship&apos;s times to recommend a realistic activity window with a
        return buffer built in.
      </p>

      <div className="mt-8 rounded-3xl border border-navy-900/10 bg-white p-6 sm:p-8 shadow-sm space-y-8">
        <div>
          <h2 className="font-display text-xl text-navy-900">Your ship</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-navy-900">Cruise line</span>
              <select
                value={cruiseLine}
                onChange={(e) => setCruiseLine(e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
              >
                {cruiseLines.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-navy-900">Ship name</span>
              <input
                type="text"
                value={ship}
                onChange={(e) => setShip(e.target.value)}
                placeholder="e.g. Voyager of the Seas"
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-navy-900">Arrival date</span>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
              />
            </label>
            <div />
            <label className="block">
              <span className="text-sm font-semibold text-navy-900">Estimated docking time</span>
              <input
                type="time"
                value={dockingTime}
                onChange={(e) => setDockingTime(e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-navy-900">All-aboard / departure time</span>
              <input
                type="time"
                value={allAboardTime}
                onChange={(e) => setAllAboardTime(e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/30"
              />
            </label>
          </div>
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
        </div>

        <div>
          <h2 className="font-display text-xl text-navy-900">Your group</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberStepper label="Adults" value={adults} onChange={setAdults} min={1} max={16} />
            <NumberStepper label="Children" value={children} onChange={setChildren} min={0} max={12} />
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl text-navy-900">Budget</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {budgetOptions.map((b) => (
              <OptionTile key={b.id} selected={budget === b.id} onClick={() => setBudget(b.id)} icon={b.icon} label={b.label} sublabel={b.range} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl text-navy-900">What are you interested in?</h2>
          <p className="mt-1 text-sm text-ink-soft">Select as many as you like.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cruiseInterests.map((i) => (
              <OptionTile key={i.id} selected={interests.includes(i.id)} onClick={() => toggleInterest(i.id)} icon={i.icon} label={i.id} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
        >
          Build my day in port
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}
