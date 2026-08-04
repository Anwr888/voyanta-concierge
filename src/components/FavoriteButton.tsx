"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { getFavorites, toggleFavorite } from "@/lib/storage";

export function FavoriteButton({ slug, className = "" }: { slug: string; className?: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // localStorage isn't available during SSR, so favorite state can only be
    // read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(getFavorites().includes(slug));
  }, [slug]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = toggleFavorite(slug);
        setIsFavorite(next.includes(slug));
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm hover:bg-white transition-colors ${className}`}
    >
      <Icon name="Heart" size={15} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
}
