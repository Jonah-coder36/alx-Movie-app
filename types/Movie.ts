// types/Movie.ts
export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  genre_ids?: number[]; // from /trending API
  genres?: Genre[];     // from /movie/:id API
}

