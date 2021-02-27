import axios from 'axios';

import { API_URLS } from '../constants';


export const getTrendingMovies = async (page) => {
  try {
    const result = await axios.get(`${API_URLS.GET_TRENDING_MOVIES}&page=${page}`);
    return {
      res:result.data
    }
  } catch (e) {
    return {
      err:e?.response?.data
    }
  }
}

export const getCurrentMovies = async (page) => {
  try {
    const result = await axios.get(`${API_URLS.GET_CURRENT_MOVIES}&page=${page}`);
    return {
      res:result.data
    }
  } catch (e) {
    return {
      err:e?.response?.data
    }
  }
}


export const getSearchResults = async (query, page = 1) => {
  try {
    const result = await axios.get(`${API_URLS.GET_SEARCH_MOVIES}&query=${query}&page=${page}`);
    return {
      res:result.data
    }
  } catch (e) {
    return {
      err:e?.response?.data
    }
  }
}

export const getMovieDetails = async (movie_id) => {
  try {
    const result = await axios.get(`${API_URLS.GET_MOVIE_DETAILS.replace(/{movie_id}/, movie_id)}`);
    return {
      res:result.data
    }
  } catch (e) {
    return {
      err:e?.response?.data
    }
  }
}
