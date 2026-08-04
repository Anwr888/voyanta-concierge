"use client";

import { Icon } from "@/components/Icon";

export function OptionTile({
  selected,
  onClick,
  icon,
  label,
  sublabel,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-navy-900 bg-navy-900 text-white shadow-md"
          : "border-navy-900/12 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-sand-100"
      }`}
    >
      {icon && (
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            selected ? "bg-white/15 text-gold-300" : "bg-navy-900/5 text-navy-800"
          }`}
        >
          <Icon name={icon} size={18} />
        </div>
      )}
      <span className="text-sm font-semibold">{label}</span>
      {sublabel && <span className={`text-xs ${selected ? "text-white/60" : "text-ink-soft"}`}>{sublabel}</span>}
      {selected && (
        <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-navy-950">
          <Icon name="Check" size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
