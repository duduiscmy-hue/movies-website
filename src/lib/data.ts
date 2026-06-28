import moviesData from './movies.json';
import { Movie } from "./types";



let cached: Movie[] | null = null;

function loadData(): Movie[] {
  if (cached) return cached;
  cached = moviesData as Movie[];
  return cached;
}

export function getAllMovies(): Movie[] {
  return loadData();
}

export function searchMovies(query: string): Movie[] {
  const q = query.toLowerCase().trim();
  if (!q) return loadData();

  return loadData().filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genre.some((g) => g.toLowerCase().includes(q))
  );
}

export function getMovieById(id: string): Movie | undefined {
  const numId = Number(id);
  return loadData().find((m) => m.id === numId);
}

export function getMovieByTitle(title: string): Movie | undefined {
  return loadData().find((m) => m.title === title);
}
