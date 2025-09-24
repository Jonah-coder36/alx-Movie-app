import styled from "styled-components";
import MovieCard from "./MovieCard";  
import { Movie } from "../types/Movie";


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
`;

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
}
