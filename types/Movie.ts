export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}
