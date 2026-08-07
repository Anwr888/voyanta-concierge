import { businesses } from "@/lib/data/businesses";
import { cruisePackages } from "@/lib/data/packages";
import { guides } from "@/lib/data/guides";
import { getCategory } from "@/lib/data/categories";
import { Business, CruisePackage, GuideArticle } from "@/lib/types";

// A single, deliberately naive keyword search over Voyanta's existing sample
// data. This is the seam meant to be swapped later for a real search
// backend (a database query, a hosted search index, an LLM-based query
// parser for phrases like "things to do with kids for 4 hours", etc.) —
// everything downstream (the homepage search bar, the /search results page)
// only calls `searchAll`, so replacing this function's internals is the only
// change a future integration should need.

export type SearchResult =
  | { type: "business"; score: number; item: Business }
  | { type: "package"; score: number; item: CruisePackage }
  | { type: "guide"; item: GuideArticle; score: number };

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, " ");
}

function tokenize(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

// Counts token hits in `haystack`, with `nameHaystack` weighted higher so a
// match on the title/name ranks above a match buried in a long description.
function scoreTokens(tokens: string[], nameHaystack: string, bodyHaystack: string): number {
  const name = normalize(nameHaystack);
  const body = normalize(bodyHaystack);
  let score = 0;
  for (const token of tokens) {
    if (name.includes(token)) score += 5;
    if (body.includes(token)) score += 1;
  }
  // Whole-phrase match (e.g. "swimming pigs") is a strong signal beyond the
  // sum of its individual tokens.
  const phrase = normalize(tokens.join(" "));
  if (phrase && name.includes(phrase)) score += 8;
  else if (phrase && body.includes(phrase)) score += 3;
  return score;
}

function searchBusinesses(tokens: string[]): SearchResult[] {
  return businesses
    .map((item) => {
      const cat = getCategory(item.category);
      const nameHaystack = item.name;
      const bodyHaystack = [
        item.subcategory,
        cat?.name,
        item.area,
        item.island,
        item.shortDescription,
        item.description,
        item.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" ");
      let score = scoreTokens(tokens, nameHaystack, bodyHaystack);
      if (item.featured) score += 1;
      if (item.verified) score += 1;
      return { type: "business" as const, score, item };
    })
    .filter((r) => r.score > 0);
}

function searchPackages(tokens: string[]): SearchResult[] {
  return cruisePackages
    .map((item) => {
      const nameHaystack = item.name;
      const bodyHaystack = [
        item.category,
        item.tagline,
        item.description,
        item.interests.join(" "),
        item.meetingLocation,
        item.providerName,
      ]
        .filter(Boolean)
        .join(" ");
      const score = scoreTokens(tokens, nameHaystack, bodyHaystack);
      return { type: "package" as const, score, item };
    })
    .filter((r) => r.score > 0);
}

function searchGuides(tokens: string[]): SearchResult[] {
  return guides
    .map((item) => {
      const nameHaystack = item.title;
      const bodyHaystack = [
        item.category,
        item.island,
        item.excerpt,
        ...item.sections.map((s) => `${s.heading} ${s.body.join(" ")}`),
        ...(item.tips ?? []),
      ]
        .filter(Boolean)
        .join(" ");
      const score = scoreTokens(tokens, nameHaystack, bodyHaystack);
      return { type: "guide" as const, score, item };
    })
    .filter((r) => r.score > 0);
}

export function searchAll(query: string, limit = 12): SearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const results = [...searchBusinesses(tokens), ...searchPackages(tokens), ...searchGuides(tokens)];
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

export function resultHref(result: SearchResult): string {
  if (result.type === "business") return `/marketplace/business/${result.item.slug}`;
  if (result.type === "package") return `/cruise/packages/${result.item.slug}`;
  return `/guides/${result.item.slug}`;
}

export function resultTitle(result: SearchResult): string {
  if (result.type === "business") return result.item.name;
  if (result.type === "package") return result.item.name;
  return result.item.title;
}
