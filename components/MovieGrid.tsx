import styled from 'styled-components';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
  gap:16px;
  align-items:start;
`;

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <Grid>
      {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
    </Grid>
  );
}