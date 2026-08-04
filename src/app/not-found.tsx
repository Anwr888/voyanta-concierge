import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
        This spot isn&apos;t on the map.
      </h1>
      <p className="mt-3 text-ink-soft">
        The page you&apos;re looking for may have moved. Let&apos;s get you back on course.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          <Icon name="ArrowLeft" size={15} />
          Back to homepage
        </Link>
        <Link
          href="/plan"
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
        >
          Start planning
        </Link>
      </div>
    </div>
  );
}
