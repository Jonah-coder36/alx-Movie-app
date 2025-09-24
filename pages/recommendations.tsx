// pages/recommendations.tsx
import { useFavorites } from "../context/FavoritesContext";
import { Movie } from "../types/Movie";
import MovieGrid from "../components/MovieGrid";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
`;

export default function RecommendationsPage() {
  const { favorites } = useFavorites();

  // collect all genres from favorites
  const favoriteGenres: number[] = favorites.flatMap((f: Movie) => f.genre_ids ?? []);

  // get recommended movies (for now, just filter favorites by shared genres)
  const recommended: Movie[] = favorites.filter((m: Movie) =>
    m.genre_ids?.some((g: number) => favoriteGenres.includes(g))
  );

  return (
    <Container>
      <h1>Recommended Movies</h1>
      {recommended.length > 0 ? (
        <MovieGrid movies={recommended} />
      ) : (
        <p>No recommendations yet. Add favorites to see more.</p>
      )}
    </Container>
  );
}
