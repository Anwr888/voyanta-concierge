import Link from "next/link";
import Image from "next/image";
import { GuideArticle } from "@/lib/types";

export function GuideCard({ guide }: { guide: GuideArticle }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={guide.heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-navy-800 uppercase">
          {guide.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg leading-snug text-navy-900 group-hover:text-navy-700">{guide.title}</h3>
        <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-1">{guide.excerpt}</p>
        <p className="mt-3 text-xs font-medium text-ink-soft">{guide.readMinutes} min read</p>
      </div>
    </Link>
  );
}
