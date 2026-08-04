import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Your saved trip and favorite listings.",
};

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return children;
}
