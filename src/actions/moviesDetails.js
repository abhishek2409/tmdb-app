import {
  FETCH_MOVIE_DETAILS_REQUESTED,
  FETCH_MOVIE_DETAILS_RECEIVED,
  FETCH_MOVIE_DETAILS_ERROR,
  ERROR_DETAIL
} from '../constants';

import { getMovieDetails } from '../api'

export const fetchMovieData = (movie_id) => async(dispatch) => {
  dispatch({
    type: FETCH_MOVIE_DETAILS_REQUESTED,
    payload: movie_id
  });
  const response = await getMovieDetails(movie_id);

  if(response.err){
    dispatch({
      type: FETCH_MOVIE_DETAILS_ERROR,
      payload: {
        data: response?.err?.status_message || ERROR_DETAIL.message,
        movie_id
      }
    });
  }else{
    dispatch({
      type: FETCH_MOVIE_DETAILS_RECEIVED,
      payload: {
        data: response.res,
        movie_id
      }
    });
  }
};
