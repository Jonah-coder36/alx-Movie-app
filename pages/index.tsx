import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieList from "../components/MovieList";
import { Movie } from "../types/Movie";

export default function Home() {
  const { favorites } = useFavorites();
  const [trending, setTrending] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch trending movies
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setTrending(data.results || []);
      } catch (err) {
        console.error("Error fetching trending:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  // Fetch recommendations based on each favorite's genres
  useEffect(() => {
    async function fetchRecommendations() {
      if (favorites.length === 0) return;

      const promises = favorites.map((fav) =>
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            process.env.NEXT_PUBLIC_TMDB_API_KEY
          }&with_genres=${(fav.genre_ids || []).join(",")}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);

      // Flatten results
      const allMovies: Movie[] = results.flatMap((r) => r.results || []);

      // Deduplicate by movie ID
      const uniqueMovies = Array.from(
        new Map(allMovies.map((m) => [m.id, m])).values()
      );

      // Exclude already favorited movies
      const filtered = uniqueMovies.filter(
        (m) => !favorites.some((fav) => fav.id === m.id)
      );

      // Optional: filter strictly client-side to ensure at least one matching genre
      const favoriteGenres = new Set(favorites.flatMap((m) => m.genre_ids || []));
      const strictFiltered = filtered.filter((m) =>
        m.genre_ids?.some((g) => favoriteGenres.has(g))
      );

      setRecommended(strictFiltered);
    }

    fetchRecommendations();
  }, [favorites]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={trending} />

      {recommended.length > 0 && (
        <>
          <h2>Recommended Movies</h2>
          <MovieList movies={recommended} />
        </>
      )}
    </div>
  );
}
