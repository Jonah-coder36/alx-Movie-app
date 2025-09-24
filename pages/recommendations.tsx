import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieList from "../components/MovieList";

export default function RecommendationsPage() {
  const { favorites } = useFavorites();
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (favorites.length === 0) return;

    const fetchRecommendations = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      let recs: any[] = [];

      for (const fav of favorites) {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${fav.id}/recommendations?api_key=${apiKey}`
        );
        const data = await res.json();
        recs = [...recs, ...(data.results || [])];
      }

      // Remove duplicates by movie ID
      const uniqueRecs = Array.from(new Map(recs.map(m => [m.id, m])).values());

      setRecommendations(uniqueRecs);
    };

    fetchRecommendations();
  }, [favorites]);

  return (
    <div>
      <h1>Recommended For You</h1>
      {recommendations.length > 0 ? (
        <MovieList movies={recommendations} />
      ) : (
        <p>Add some favorites to see recommendations!</p>
      )}
    </div>
  );
}