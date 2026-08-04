import Image from "next/image";
import { VoyantaEvent } from "@/lib/types";
import { Icon } from "@/components/Icon";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function EventCard({ event }: { event: VoyantaEvent }) {
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm sm:flex-row">
      <div className="relative h-40 sm:h-auto sm:w-48 shrink-0 overflow-hidden">
        <Image src={event.image} alt="" fill sizes="192px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-teal-700 uppercase">
          {event.category}
        </span>
        <h3 className="mt-2 font-display text-lg text-navy-900">{event.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Icon name="CalendarCheck2" size={13} />
            {dateFormatter.format(start)}
            {end ? ` – ${dateFormatter.format(end)}` : ""}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="MapPin" size={13} /> {event.location}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
