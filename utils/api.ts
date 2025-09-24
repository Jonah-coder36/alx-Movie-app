import axios from "axios";

const tmdb = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-US",
  },
});

export async function fetchTrendingMovies() {
  const res = await tmdb.get("/trending/movie/week");
  return res.data.results;
}

export async function fetchPopularMovies() {
  const res = await tmdb.get("/movie/popular");
  return res.data.results;
}

export async function fetchMovieDetails(id: string | number) {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "videos,images" },
  });
  return res.data;
}
