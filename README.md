# Voyanta Concierge

Your Bahamas vacation, expertly planned. A concierge-style planning platform for two
traveler types: **vacation travelers** staying in The Bahamas, and **cruise
passengers** with only a few hours ashore.

This is the frontend build described in the project brief — a fully interactive
Next.js app with realistic sample data (no live database, auth, or payments yet).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's built

- **Homepage** — hero, the vacation/cruise traveler fork, how it works, marketplace categories, featured listings, destination gallery, cruise return-buffer explainer, guides teaser, business CTA.
- **Vacation Planner** (`/plan`) — multi-step quiz → fully editable, saveable itinerary with a cost estimate.
- **Cruise Passengers** (`/cruise`, `/cruise/planner`, `/cruise/packages`) — the Cruise Day Planner computes a recommended activity window with an arrival/return buffer from your ship's docking and all-aboard times, then recommends packages and nearby activities that actually fit.
- **Marketplace** (`/marketplace`) — 11 categories, 27 sample business listings, search/filter/sort, business profile pages, and a List/Map toggle showing an interactive map (Leaflet + OpenStreetMap, no API key) of the filtered listings.
- **Trip Builder** (`/trip-builder`) — drag-and-drop day planner, cost estimate, real shareable links (trip data is encoded in the URL, no backend needed), print/PDF.
- **Guides** (`/guides`) — 14 categories of local recommendations and travel tips.
- **Events** (`/events`), **List Your Business**, **About**, **Contact & Concierge**, **Group Planning**, **Account** (localStorage-based favorites & saved trip).

## Project structure

```
src/
  app/            Routes (App Router)
  components/      Shared UI (Header, Footer, cards, planners, icon system)
  lib/
    data/          Sample content: businesses, cruise packages, guides, events, itineraries
    types.ts        Shared content types
    cruise.ts        Return-buffer + recommendation logic
    itinerary.ts     Itinerary generation + cost estimate
    storage.ts       localStorage helpers (trip, favorites)
  components/map/  Leaflet/OpenStreetMap components (business pin, marketplace multi-pin map)
public/
  images/          Optimized photography (from the project's provided assets)
  video/           Compressed hero background clips
media-source/      Original, uncompressed photos/videos (not shipped to the site)
```

## Known gaps (by design, for this phase)

- No real backend — businesses, reviews, and events are sample data in `src/lib/data`.
- No real accounts/auth — the Account page uses browser localStorage.
- Maps use OpenStreetMap tiles via Leaflet (no API key, no billing setup). Business coordinates are approximate (placed by neighborhood/area, not a geocoded street address) since these are sample listings.
- Marketplace listing photos are deliberately generated category tiles (gradient + icon), not stock photos standing in for real businesses.
