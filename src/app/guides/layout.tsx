import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guides",
  description: "Beaches, restaurants, hidden gems, and practical travel tips for The Bahamas.",
};

export default function GuidesLayout({ children }: LayoutProps<"/guides">) {
  return children;
}
