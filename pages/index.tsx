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

  // Fetch recommendations based on favorite genres
  useEffect(() => {
    async function fetchRecommendations() {
      if (favorites.length === 0) {
        setRecommended([]);
        return;
      }

      // 1. Collect unique genre IDs from all favorite movies
      const allGenreIds = new Set<number>();
      favorites.forEach((fav) => {
        fav.genre_ids?.forEach((genreId) => {
          allGenreIds.add(genreId);
        });
      });

      if (allGenreIds.size === 0) {
        setRecommended([]);
        return;
      }

      // 2. Join the unique genre IDs for a single API call
      const genreIdsString = Array.from(allGenreIds).join(",");

      try {
        // 3. Fetch movies with any of the collected genres
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            process.env.NEXT_PUBLIC_TMDB_API_KEY
          }&with_genres=${genreIdsString}&sort_by=popularity.desc`
        );
        const allMovies: Movie[] = trending.concat(recommended);

        const recommended: Movie[] = allMovies.filter((m: Movie) =>
        favoriteGenres.some((g: number) => m.genre_ids?.includes(g))
        );
        // 4. Remove duplicates and movies already in favorites
        const uniqueMovies = Array.from(
          new Map(allMovies.map((m) => [m.id, m])).values()
        );

        const filtered = uniqueMovies.filter(
          (m) => !favorites.some((fav) => fav.id === m.id)
        );

        // 5. Ensure movies have at least one genre in common with favorites (this step is optional but adds a nice filter)
        const favoriteGenresSet = new Set(
          favorites.flatMap((m) => m.genre_ids || [])
        );
        const strictFiltered = filtered.filter((m) =>
          m.genre_ids?.some((g) => favoriteGenresSet.has(g))
        );

        setRecommended(strictFiltered);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    }

    fetchRecommendations();
  }, [favorites]);

  if (loading) {
    return <p>Loading...</p>;
  }

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
