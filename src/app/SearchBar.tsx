"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
    },
    [value, router]
  );

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg" role="search">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="搜索片名、导演、类型…"
        aria-label="搜索电影"
        className="w-full h-12 pl-5 pr-12 rounded-xl border border-border bg-paper-light
                   text-ink placeholder:text-ink-light/50
                   outline-none transition-all duration-300
                   focus:border-accent focus:ring-2 focus:ring-accent/15
                   text-[15px]"
      />
      <button
        type="submit"
        aria-label="搜索"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9
                   flex items-center justify-center rounded-lg
                   text-ink-light/60 hover:text-accent hover:bg-accent-subtle
                   transition-colors duration-200"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
}
