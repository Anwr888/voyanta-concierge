"use client";

import { Icon } from "@/components/Icon";

export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-navy-900/12 bg-white px-4 py-3.5">
      <span className="text-sm font-semibold text-navy-900">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/15 text-navy-800 disabled:opacity-30 hover:bg-sand-100 transition-colors"
        >
          <Icon name="Minus" size={14} />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-navy-900 tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/15 text-navy-800 disabled:opacity-30 hover:bg-sand-100 transition-colors"
        >
          <Icon name="Plus" size={14} />
        </button>
      </div>
    </div>
  );
}
