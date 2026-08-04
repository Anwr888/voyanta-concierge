import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getPackage, cruisePackages } from "@/lib/data/packages";
import { businesses } from "@/lib/data/businesses";
import { bandLabels } from "@/lib/cruise";

export function generateStaticParams() {
  return cruisePackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cruise/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return { title: pkg.name, description: pkg.tagline };
}

export default async function CruisePackageDetailPage({ params }: PageProps<"/cruise/packages/[slug]">) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const provider = businesses.find((b) => b.name === pkg.providerName);

  return (
    <div>
      <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden bg-navy-950">
        <Image src={pkg.image} alt={pkg.name} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
            <Link href="/cruise/packages" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white">
              <Icon name="ArrowLeft" size={14} /> All cruise packages
            </Link>
            <p className="eyebrow eyebrow-on-dark mt-4">{pkg.category}</p>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl text-white">{pkg.name}</h1>
            <p className="mt-2 max-w-xl text-white/75">{pkg.tagline}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat icon="Clock" label="Activity time" value={`~${pkg.durationHours}h`} />
              <Stat icon="Hourglass" label="Suggested port time" value={`${pkg.minPortTimeHours}h+`} />
              <Stat icon="MapPin" label="From cruise port" value={`${pkg.distanceFromPortMinutes} min`} />
              <Stat icon="Tag" label="Starting from" value={`$${pkg.priceFrom}`} />
            </div>

            <section>
              <h2 className="font-display text-2xl text-navy-900">About this package</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{pkg.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-700">
                <Icon name="Clock" size={13} /> Best for {bandLabels[pkg.durationBand]} in port
              </span>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-lg text-navy-900 flex items-center gap-1.5">
                  <Icon name="CheckCircle2" size={17} className="text-teal-600" /> What&apos;s included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {pkg.whatsIncluded.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Icon name="Check" size={14} className="mt-0.5 shrink-0 text-teal-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-navy-900 flex items-center gap-1.5">
                  <Icon name="XCircle" size={17} className="text-navy-900/40" /> Not included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {pkg.whatsNotIncluded.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Icon name="X" size={14} className="mt-0.5 shrink-0 text-navy-900/30" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-display text-lg text-navy-900">Requirements</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {pkg.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon name="Info" size={14} className="mt-0.5 shrink-0 text-gold-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-display text-lg text-navy-900">Meeting location & transportation</h3>
              <p className="mt-2 text-sm text-ink-soft">
                <strong className="text-navy-900">Meets at:</strong> {pkg.meetingLocation}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{pkg.transportationInfo}</p>
            </section>

            <section>
              <h3 className="font-display text-lg text-navy-900">Cancellation policy</h3>
              <p className="mt-2 text-sm text-ink-soft">{pkg.cancellationPolicy}</p>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Provided by</p>
              <p className="mt-1 font-display text-lg text-navy-900">{pkg.providerName}</p>
              <p className="mt-1 text-xs text-ink-soft">
                Independent local operator. Voyanta Concierge helps you discover and plan this
                experience — it is not directly operated by Voyanta.
              </p>
              {provider && (
                <Link
                  href={`/marketplace/business/${provider.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  View provider profile <Icon name="ArrowRight" size={14} />
                </Link>
              )}
              <div className="mt-5 space-y-2">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
                >
                  Check availability
                </Link>
                <Link
                  href="/cruise/planner"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
                >
                  See if this fits my day
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-2xl border border-gold-400/40 bg-gold-300/10 p-4 text-xs text-navy-900 leading-relaxed">
              <Icon name="TriangleAlert" size={15} className="mt-0.5 shrink-0 text-gold-600" />
              Return-to-ship times are never guaranteed. Please confirm your own all-aboard time
              with your cruise line.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-sand-100 p-3.5">
      <Icon name={icon} size={16} className="text-navy-700" />
      <p className="mt-2 text-sm font-semibold text-navy-900">{value}</p>
      <p className="text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}
