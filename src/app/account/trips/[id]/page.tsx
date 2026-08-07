import type { Metadata } from "next";
import { ViewTripClient } from "./ViewTripClient";

export const metadata: Metadata = {
  title: "View Trip",
  description: "A read-only look at your saved Bahamas itinerary.",
};

export default function ViewTripPage() {
  return <ViewTripClient />;
}
