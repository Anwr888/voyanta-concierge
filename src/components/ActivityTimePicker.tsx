"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { activityTimeOptions } from "@/lib/itinerary";

// Reusable time picker for an itinerary activity row — used by both the
// Trip Builder and the Vacation Planner's itinerary editor, so a manual
// time selection behaves identically everywhere. Renders its dropdown
// through a portal into document.body, positioned from the trigger
// button's own bounding rect: every day card clips overflow for its
// rounded corners, so a plain `position: absolute` panel would get cut
// off for activities near the bottom of a day.
export function ActivityTimePicker({ value, onChange }: { value: string; onChange: (time: string) => void }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  function openPicker() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setCoords({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    // Scrolling the list itself to reveal the current selection fires its
    // own (async) scroll event — it must not be mistaken for the page
    // scrolling out from under the panel below.
    selectedRef.current?.scrollIntoView({ block: "nearest" });

    function isInsideTrigger(target: Node) {
      return !!buttonRef.current?.contains(target) || !!panelRef.current?.contains(target);
    }
    // pointerdown, not click: it fires before the button's own onClick, so
    // this only ever sees clicks that land outside the picker entirely —
    // the click that opened it never reaches this listener.
    function onPointerDown(e: PointerEvent) {
      if (isInsideTrigger(e.target as Node)) return;
      setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    // Scrolling *inside* the options list (a wheel gesture, or the
    // scrollIntoView above) must keep the picker open — only a scroll of
    // the page or some other ancestor, which would leave the fixed-position
    // panel visually stranded away from its trigger, should close it.
    function onScroll(e: Event) {
      if (panelRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onResize() {
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        draggable={false}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          if (open) setOpen(false);
          else openPicker();
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Activity time"
        className="w-24 shrink-0 rounded-lg bg-sand-100 px-2.5 py-1.5 text-xs font-semibold text-navy-800 text-center h-fit hover:bg-sand-200 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-900/20"
      >
        {value}
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label="Choose a time"
            draggable={false}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ position: "fixed", top: coords.top, left: coords.left, minWidth: coords.width }}
            className="z-[70] max-h-60 overflow-y-auto rounded-xl border border-navy-900/10 bg-white p-1 shadow-xl shadow-navy-950/15"
          >
            {activityTimeOptions.map((t) => (
              <button
                key={t}
                ref={t === value ? selectedRef : undefined}
                type="button"
                role="option"
                draggable={false}
                aria-selected={t === value}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(t);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                  t === value ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-sand-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
