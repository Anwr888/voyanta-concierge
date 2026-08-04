import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Calendar",
  description: "Festivals, concerts, cultural events, and holiday celebrations across The Bahamas.",
};

export default function EventsLayout({ children }: LayoutProps<"/events">) {
  return children;
}
