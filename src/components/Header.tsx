"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { primaryNav, secondaryNav } from "@/lib/nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-sand-50/95 backdrop-blur supports-[backdrop-filter]:bg-sand-50/80 border-b transition-shadow ${
        scrolled ? "border-navy-900/10 shadow-[0_1px_0_0_rgba(16,35,61,0.06)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between py-2.5">
          <Logo variant="dark" />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {primaryNav.map((group) =>
              group.links ? (
                <div key={group.label} className="relative group">
                  <Link
                    href={group.href}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold text-navy-800 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
                  >
                    {group.label}
                    <Icon name="ChevronDown" size={14} className="text-navy-800/60" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 transition-all duration-150">
                    <div className="w-72 rounded-2xl border border-navy-900/10 bg-white shadow-xl shadow-navy-950/10 p-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block rounded-xl px-3.5 py-2.5 hover:bg-sand-100 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-navy-900">{link.label}</span>
                          {link.description && (
                            <span className="block text-xs text-ink-soft mt-0.5">{link.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={group.label}
                  href={group.href}
                  className="px-3.5 py-2 rounded-full text-sm font-semibold text-navy-800 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
                >
                  {group.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/list-your-business"
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-navy-800 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="p-2.5 rounded-full text-navy-800 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
            >
              <Icon name="CircleUserRound" size={20} />
            </Link>
            <Link
              href="/plan"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Start Planning
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-navy-900"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-900/10 bg-sand-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-1">
            {primaryNav.map((group) => (
              <div key={group.label} className="py-1.5">
                <Link href={group.href} className="block text-base font-semibold text-navy-900 py-1.5">
                  {group.label}
                </Link>
                {group.links && (
                  <div className="pl-3 mt-1 space-y-1 border-l-2 border-gold-400/50">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="block text-sm text-ink-soft py-1.5">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="h-px bg-navy-900/10 my-3" />
            {secondaryNav.map((link) => (
              <Link key={link.href} href={link.href} className="block text-base font-medium text-navy-800 py-2">
                {link.label}
              </Link>
            ))}
            <Link
              href="/plan"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4.5 py-3 text-sm font-semibold text-white"
            >
              Start Planning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
