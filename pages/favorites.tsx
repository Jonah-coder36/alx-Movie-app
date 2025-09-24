// pages/favorites.tsx
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useFavorites } from "../context/FavoritesContext";
import { Movie } from "../types/Movie";

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const Info = styled.div`
  padding: 1rem;
  color: #222;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #111;
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const RemoveButton = styled.button`
  background: #888;
  color: #fff;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.3s;

  &:hover {
    background: #555;
  }
`;

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Container>
      <h1>My Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <Grid>
          {favorites.map((movie: Movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "/no-poster.png";

            return (
              <Card key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <PosterWrapper>
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </PosterWrapper>
                </Link>
                <Info>
                  <Title>{movie.title}</Title>
                  <Text>⭐ {movie.vote_average}</Text>
                  <Text>
                    {movie.genres
                      ? movie.genres.map((g) => g.name).join(", ")
                      : movie.genre_ids?.join(", ") || "N/A"}
                  </Text>
                  <RemoveButton onClick={() => removeFavorite(movie.id)}>
                    Remove
                  </RemoveButton>
                </Info>
              </Card>
            );
          })}
          </Grid>
      )}
    </Container>
  );
}
