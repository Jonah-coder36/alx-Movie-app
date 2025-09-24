// pages/movies/[id].tsx
import { GetServerSideProps } from "next";
import Image from "next/image";
import styled from "styled-components";
import { useFavorites } from "../../context/FavoritesContext";
import { Movie } from "../../types/Movie";

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  color: #222;
  display: flex;
  gap: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  flex-shrink: 0;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #111;
`;

const Text = styled.p`
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #333;
`;

const SaveButton = styled.button<{ saved?: boolean }>`
  background: ${(props) => (props.saved ? "#4CAF50" : "#e50914")};
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: ${(props) => (props.saved ? "not-allowed" : "pointer")};
  margin-top: auto;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.saved ? "#4CAF50" : "#f6121d")};
  }
`;

interface MovieDetailProps {
  movie: Movie;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  const { addFavorite, favorites } = useFavorites();

  if (!movie) return <p>Movie not found</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  // ✅ Check if this movie is already in favorites
  const isSaved = favorites.some((fav) => fav.id === movie.id);

  return (
    <Container>
      <PosterWrapper>
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      </PosterWrapper>

      <Details>
        <Title>{movie.title}</Title>
        <Text>
          <strong>Rating:</strong> ⭐ {movie.vote_average}
        </Text>
        <Text>
          <strong>Genres:</strong>{" "}
          {movie.genres?.map((g: { id: number; name: string }) => g.name).join(", ") ||
            "N/A"}
        </Text>
        <Text>
          <strong>Overview:</strong> {movie.overview}
        </Text>

        {/* ✅ Smart Save Button */}
        <SaveButton
          saved={isSaved}
          onClick={() => {
            if (!isSaved) addFavorite(movie);
          }}
          disabled={isSaved}
        >
          {isSaved ? "Saved ✅" : "Save"}
        </SaveButton>
      </Details>
    </Container>
  );
}

// ✅ Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const movie: Movie = await res.json();

  return {
    props: { movie },
  };
};
