import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE = process.env.NEXT_PUBLIC_TMDB_BASE || 'https://api.themoviedb.org/3';

export const tmdb = axios.create({
  baseURL: BASE,
  params: {
    api_key: API_KEY
  }
});

export const imageUrl = (path: string | undefined | null, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder.png';
