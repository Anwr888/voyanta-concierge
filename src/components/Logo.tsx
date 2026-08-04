import Image from "next/image";
import Link from "next/link";

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  // "dark" variant = navy wordmark, for use on light backgrounds
  // "light" variant = white wordmark, for use on dark/photo backgrounds
  const src = variant === "dark" ? "/images/brand/voyanta-logo-light-bg.png" : "/images/brand/voyanta-logo-dark-bg.png";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 shrink-0 ${className}`} aria-label="Voyanta Concierge home">
      <Image src={src} alt="Voyanta Concierge" width={40} height={40} className="h-9 w-9 sm:h-10 sm:w-10 object-contain" priority />
      <span
        className={`font-display text-lg sm:text-xl tracking-wide leading-none ${
          variant === "dark" ? "text-navy-900" : "text-white"
        }`}
      >
        VOYANTA
        <span className={`block text-[0.55rem] tracking-[0.3em] font-sans font-bold ${variant === "dark" ? "text-gold-600" : "text-gold-400"}`}>
          CONCIERGE
        </span>
      </span>
    </Link>
  );
}
