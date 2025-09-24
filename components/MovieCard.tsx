import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { GENRE_MAP } from "../lib/genres";
import { Movie } from "../types/Movie";

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #1c1c1c;
  color: white;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0.5rem;
`;

const Genres = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem;
  color: #aaa;
`;

export default function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/no-poster.png";

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card>
        <Poster>
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Poster>
        <Title>{movie.title}</Title>
        {movie.genre_ids && (
          <Genres>
            {movie.genre_ids.map((id) => GENRE_MAP[id]).join(", ")}
          </Genres>
        )}
      </Card>
    </Link>
  );
}
