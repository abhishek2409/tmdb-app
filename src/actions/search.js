import {
  FETCH_SEARCH_REQUESTED,
  FETCH_SEARCH_RECEIVED,
  FETCH_SEARCH_ERROR,
  ERROR_DETAIL
} from '../constants';

import { getSearchResults } from '../api'

export const fetchSearchData = (page, key) => async(dispatch) => {
  dispatch({
    type: FETCH_SEARCH_REQUESTED,
    payload: key
  });
  const response = await getSearchResults(key, page);

  if(response.err){
    dispatch({
      type: FETCH_SEARCH_ERROR,
      payload: {
        data: response?.err?.status_message || ERROR_DETAIL.message,
        key
      }
    });
  }else{
    dispatch({
      type: FETCH_SEARCH_RECEIVED,
      payload: {
        data: response.res,
        key
      }
    });
  }
};
