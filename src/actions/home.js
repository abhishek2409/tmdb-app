import {
  FETCH_MOVIES_REQUESTED,
  FETCH_MOVIES_RECEIVED,
  FETCH_MOVIES_ERROR,
  ERROR_DETAIL,
  MOVIES_KEY,
  SET_CURRENT_TAB
} from '../constants';

import { getTrendingMovies, getCurrentMovies } from '../api'

export const setCurrentTab = tab => dispatch => {
  dispatch({
    type:SET_CURRENT_TAB,
    payload:tab
  })
}

export const fetchMovies = (page, key) => async(dispatch) => {
  dispatch({
    type: FETCH_MOVIES_REQUESTED,
    payload: key
  });
  const response =  key === MOVIES_KEY.TRENDING  ? await getTrendingMovies(page) : await getCurrentMovies(page);

  if(response.err){
    dispatch({
      type: FETCH_MOVIES_ERROR,
      payload: {
        data: response?.err?.status_message || ERROR_DETAIL.message,
        key
      }
    });
  }else{
    dispatch({
      type: FETCH_MOVIES_RECEIVED,
      payload: {
        data: response.res,
        key
      }
    });
  }
};
