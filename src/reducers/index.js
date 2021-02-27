import { combineReducers } from 'redux';

import homeReducer, * as fromHome from './home';
import searchReducer from './search';
import movieDetailsReducer from './movieDetails';

const rootReducer = combineReducers({
  home: homeReducer,
  search: searchReducer,
  movieDetails: movieDetailsReducer
});


export const getTrendingMovieData = state => fromHome.getTrendingMovie(state.home);
export const getCurrentPlayingMovieData = state => fromHome.getCurrentMovie(state.home);
export const getCurrentTab = state => fromHome.getCurrentTab(state.home);
export const getSearchData = state => state.search;
export const getMoviesData = state => state.movieDetails;



export default rootReducer;
