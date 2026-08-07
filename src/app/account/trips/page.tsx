import type { Metadata } from "next";
import { MyTripsClient } from "./MyTripsClient";

export const metadata: Metadata = {
  title: "My Trips",
  description: "Every Bahamas itinerary you've built, autosaved and ready to pick up where you left off.",
};

export default function MyTripsPage() {
  return <MyTripsClient />;
}
