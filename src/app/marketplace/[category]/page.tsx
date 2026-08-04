import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { MarketplaceBrowser } from "@/components/MarketplaceBrowser";
import { categories, getCategory } from "@/lib/data/categories";
import { MarketplaceCategoryId } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/marketplace/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export default async function MarketplaceCategoryPage({ params }: PageProps<"/marketplace/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-900">
        <Icon name="ArrowLeft" size={14} /> All categories
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/5 text-navy-800">
          <Icon name={cat.icon} size={22} />
        </div>
        <div>
          <p className="eyebrow">{cat.subcategories.join(" · ")}</p>
          <h1 className="font-display text-2xl sm:text-3xl text-navy-900">{cat.name}</h1>
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-ink-soft">{cat.description}</p>

      <div className="mt-10">
        <MarketplaceBrowser initialCategory={cat.id as MarketplaceCategoryId} lockCategory />
      </div>
    </div>
  );
}
