import Link from "next/link";
import { searchMovies } from "@/lib/data";
import SearchBar from "./SearchBar";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { q } = await searchParams;
  const movies = searchMovies(q ?? "");
  const hasQuery = !!q?.trim();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-paper-light/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink shrink-0">
            Classic Films
          </Link>
          <SearchBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {hasQuery && (
          <p className="text-ink-light/70 text-sm mb-6 animate-fade-in">
            Searching &quot;{q}&quot; — {movies.length} movie{movies.length !== 1 ? "s" : ""} found
          </p>
        )}

        {movies.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <p className="text-ink-light/50 text-lg">No movies found</p>
            {hasQuery && (
              <Link href="/" className="inline-block mt-4 text-accent hover:text-accent-light transition-colors text-sm">
                Clear search
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {movies.map((m, i) => (
              <Link
                key={m.id}
                href={`/movies/${m.id}`}
                className="group flex items-center gap-5 px-5 py-4 rounded-xl bg-paper-light
                           border border-border/60 hover:border-accent/30
                           transition-all duration-300 ease-out
                           hover:shadow-sm hover:-translate-y-0.5
                           animate-fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors duration-200 truncate">
                    {m.title}
                  </h2>
                  <p className="text-sm text-ink-light/60 mt-0.5 truncate">
                    {m.director}
                    <span className="mx-1.5">·</span>
                    {m.genre.join(" / ")}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm tabular-nums text-ink-light/50">{m.year}</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-ink-light/80">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-star)" stroke="var(--color-star)" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {m.rating}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                       className="text-border group-hover:text-accent/40 transition-colors duration-200 -mr-1">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-ink-light/40">
        <p>Classic Films · Timeless Masterpieces</p>
      </footer>
    </div>
  );
}
