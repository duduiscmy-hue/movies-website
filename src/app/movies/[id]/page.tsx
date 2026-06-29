import { notFound } from "next/navigation";
import Link from "next/link";
import { getMovieById } from "@/lib/data";

import { loadData } from "@/lib/data";

export async function generateStaticParams() {
  const movies = loadData();
  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}



interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) notFound();

  const starPercentage = (movie.rating / 10) * 100;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-paper-light/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-ink-light/50 hover:text-accent transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">Classic Films</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-8 mb-12">
          {movie.poster && (
            <div className="shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-48 sm:w-56 rounded-2xl border border-border/60 shadow-sm object-cover"
                style={{ aspectRatio: "2/3" }}
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2 mb-6">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                {movie.title}
              </h1>
              {movie.originalTitle !== movie.title && (
                <p className="text-base text-ink-light/50 italic">{movie.originalTitle}</p>
              )}
              <p className="text-lg text-ink-light/60">{movie.director}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-sm bg-accent-subtle text-accent font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 p-6 rounded-2xl bg-paper-light border border-border/60">
              <MetaItem label="Rating">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-2xl font-bold text-ink">{movie.rating}</span>
                  <div className="relative w-16 h-3">
                    <div className="absolute inset-0 rounded-full bg-border/60" />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-star"
                      style={{ width: `${starPercentage}%` }}
                    />
                  </div>
                </div>
              </MetaItem>

              <MetaItem label="Year">
                <span className="font-display text-xl font-semibold text-ink">{movie.year}</span>
              </MetaItem>

              <MetaItem label="Runtime">
                <span className="font-display text-xl font-semibold text-ink">{movie.runtime} min</span>
              </MetaItem>

              <MetaItem label="Country">
                <span className="font-display text-xl font-semibold text-ink">{movie.country}</span>
              </MetaItem>
            </div>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-light/40 mb-3">Plot</h2>
          <p className="text-base leading-relaxed text-ink-light/80 max-w-prose">{movie.plot}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-light/40 mb-3">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor) => (
              <span
                key={actor}
                className="px-3 py-1.5 rounded-lg text-sm bg-paper-light border border-border/60 text-ink-light/70"
              >
                {actor}
              </span>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-5 rounded-2xl bg-paper-light border border-border/60">
          <MiniMeta label="Language" value={movie.language} />
          <MiniMeta label="Country" value={movie.country} />
          <MiniMeta label="Runtime" value={`${movie.runtime} min`} />
          <MiniMeta label="Year" value={String(movie.year)} />
        </div>

        <div className="pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-light/50 hover:text-accent transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all movies
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-ink-light/40">
        <p>Classic Films · Timeless Masterpieces</p>
      </footer>
    </div>
  );
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-widest text-ink-light/40">{label}</span>
      {children}
    </div>
  );
}

function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium uppercase tracking-widest text-ink-light/40">{label}</span>
      <span className="text-sm font-medium text-ink-light/80">{value}</span>
    </div>
  );
}
