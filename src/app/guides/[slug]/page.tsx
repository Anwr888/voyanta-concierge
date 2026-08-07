import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { GuideCard } from "@/components/GuideCard";
import { guides, getGuide } from "@/lib/data/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideArticlePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guides.filter((g) => g.category === guide.category && g.slug !== guide.slug).slice(0, 3);

  return (
    <div>
      <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden bg-navy-950">
        <Image src={guide.heroImage} alt={guide.title} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 pb-10">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white">
              <Icon name="ArrowLeft" size={14} /> All guides
            </Link>
            <p className="eyebrow eyebrow-on-dark mt-4">{guide.category}</p>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl text-white">{guide.title}</h1>
            <p className="mt-3 text-sm text-white/60">{guide.readMinutes} min read{guide.island ? ` · ${guide.island}` : ""}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-lg text-ink-soft leading-relaxed">{guide.excerpt}</p>

        <div className="mt-8 space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-navy-900">{section.heading}</h2>
              {section.body.map((para, i) => (
                <p key={i} className="mt-3 text-ink-soft leading-relaxed">
                  {para}
                </p>
              ))}
              {section.quickFacts && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl bg-sand-100 px-4 py-3 text-sm text-navy-800">
                  <span className="flex items-center gap-1.5">
                    <Icon name="Ship" size={14} className="text-navy-700" /> {section.quickFacts.distanceFromPort}
                  </span>
                  {section.quickFacts.duration && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="Hourglass" size={14} className="text-navy-700" /> Recommended: {section.quickFacts.duration}
                    </span>
                  )}
                  {section.quickFacts.transport && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="Car" size={14} className="text-navy-700" /> {section.quickFacts.transport}
                    </span>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {guide.tips && (
          <div className="mt-10 rounded-2xl border border-gold-400/40 bg-gold-300/10 p-5">
            <h3 className="font-display text-lg text-navy-900 flex items-center gap-1.5">
              <Icon name="Sparkles" size={17} className="text-gold-600" /> Quick tips
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-900">
              {guide.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <Icon name="Check" size={14} className="mt-0.5 shrink-0 text-gold-600" /> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/plan"
            className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Build this into my itinerary
            <Icon name="ArrowRight" size={14} />
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
          >
            Find local providers
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-sand-100 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl text-navy-900">More {guide.category}</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((g) => (
                <GuideCard key={g.id} guide={g} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
