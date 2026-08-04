import { Icon } from "@/components/Icon";
import { ReturnBufferResult, minutesToTime, timeToMinutes, bandLabels } from "@/lib/cruise";

export function ReturnBufferTimeline({
  buffer,
  dockingTime,
}: {
  buffer: ReturnBufferResult;
  dockingTime: string;
}) {
  const dockMin = timeToMinutes(dockingTime);
  const total = buffer.totalMinutes;
  const startPct = (buffer.startBufferMinutes / total) * 100;
  const windowPct = (buffer.windowMinutes / total) * 100;
  const endPct = 100 - startPct - windowPct;

  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-ink-soft">
        <span className="flex items-center gap-1.5">
          <Icon name="Anchor" size={13} /> Docks {minutesToTime(dockMin)}
        </span>
        <span className="rounded-full bg-teal-500/10 px-2.5 py-1 text-teal-700">
          Port time: {bandLabels[buffer.band]}
        </span>
        <span className="flex items-center gap-1.5">
          All-aboard {minutesToTime(dockMin + total)} <Icon name="Ship" size={13} />
        </span>
      </div>

      <div className="mt-4 flex h-5 w-full overflow-hidden rounded-full bg-navy-900/8">
        <div className="h-full bg-navy-900/15" style={{ width: `${startPct}%` }} title="Arrival buffer" />
        <div className="h-full bg-teal-500" style={{ width: `${windowPct}%` }} title="Recommended activity window" />
        <div className="h-full bg-gold-500" style={{ width: `${endPct}%` }} title="Return buffer" />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-navy-900/25" /> Arrival buffer: {buffer.startBufferMinutes} min
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-500" /> Activity window: {buffer.windowMinutes} min
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold-500" /> Return buffer: {buffer.endBufferMinutes} min
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-sand-100 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Recommended activity window</p>
        <p className="mt-1 font-display text-2xl text-navy-900">
          {minutesToTime(buffer.windowStartMinutes)} – {minutesToTime(buffer.windowEndMinutes)}
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          ({(buffer.windowMinutes / 60).toFixed(1)} hours) — leaves time to clear the terminal, get
          to and from activities, and be back well before all-aboard.
        </p>
      </div>
    </div>
  );
}
