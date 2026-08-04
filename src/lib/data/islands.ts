import { Island } from "@/lib/types";

export interface IslandInfo {
  name: Island;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  hasCruisePort: boolean;
}

export const islands: IslandInfo[] = [
  {
    name: "New Providence (Nassau)",
    slug: "new-providence-nassau",
    tagline: "The capital island — history, beaches, and the main cruise port.",
    description:
      "Home to Nassau and Cable Beach, New Providence blends colonial history, world-class resorts, and the busiest cruise port in The Bahamas.",
    image: "/images/nassau-cruise-terminal-1.jpg",
    hasCruisePort: true,
  },
  {
    name: "Paradise Island",
    slug: "paradise-island",
    tagline: "Resort island connected to Nassau by bridge.",
    description:
      "A short bridge crossing from downtown Nassau, Paradise Island is known for its marina, beaches, and resort experiences.",
    image: "/images/baha-mar-resort-1.jpg",
    hasCruisePort: false,
  },
  {
    name: "Grand Bahama (Freeport)",
    slug: "grand-bahama-freeport",
    tagline: "Nature-forward island with reefs, forests, and a second cruise port.",
    description:
      "Grand Bahama offers national parks, reef diving, and a quieter pace than Nassau, with its own cruise port in Freeport.",
    image: "/images/nassau-oceanfront-1.jpg",
    hasCruisePort: true,
  },
  {
    name: "Exuma",
    slug: "exuma",
    tagline: "The swimming pigs, sandbars, and endless turquoise cays.",
    description:
      "A boater's paradise of 365 cays, famous for swimming pigs, nurse sharks, and some of the clearest water in the world.",
    image: "/images/nassau-oceanfront-1.jpg",
    hasCruisePort: false,
  },
  {
    name: "Abaco",
    slug: "abaco",
    tagline: "Sailing, fishing, and colorful settlements.",
    description: "A haven for sailors and anglers, with pastel harbor towns and quiet beaches.",
    image: "/images/fort-charlotte-1.jpg",
    hasCruisePort: false,
  },
  {
    name: "Eleuthera",
    slug: "eleuthera",
    tagline: "Pink sand beaches and laid-back island life.",
    description: "Home to the famous Pink Sands Beach and a slower, more residential island feel.",
    image: "/images/nassau-oceanfront-1.jpg",
    hasCruisePort: false,
  },
  {
    name: "Bimini",
    slug: "bimini",
    tagline: "The closest island to Florida — sport fishing and reefs.",
    description: "A short hop from Florida, Bimini is prized for sport fishing and diving.",
    image: "/images/nassau-oceanfront-1.jpg",
    hasCruisePort: true,
  },
  {
    name: "Harbour Island",
    slug: "harbour-island",
    tagline: "Pink beaches, golf carts, and boutique luxury.",
    description: "A boutique, golf-cart-only island beloved for its pink sand and understated luxury.",
    image: "/images/fort-charlotte-2.jpg",
    hasCruisePort: false,
  },
];

export const getIsland = (slug: string) => islands.find((i) => i.slug === slug);
