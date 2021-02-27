export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "5d5a80c24458a37f6606acd859c90f72";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/{size}{path}"

export const API_URLS = {
  GET_TRENDING_MOVIES:`${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  GET_CURRENT_MOVIES:`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
  GET_SEARCH_MOVIES:`${BASE_URL}/search/movie/?api_key=${API_KEY}`,
  GET_MOVIE_DETAILS:`${BASE_URL}/movie/{movie_id}?api_key=${API_KEY}`,
}
