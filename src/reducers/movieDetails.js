import {
  FETCH_MOVIE_DETAILS_REQUESTED,
  FETCH_MOVIE_DETAILS_RECEIVED,
  FETCH_MOVIE_DETAILS_ERROR
} from '../constants';

const initialState = {};

const movieDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS_REQUESTED:{
      return{
        ...state,
        [action.payload]:{
          isRequested:true
        }
      }
    }
    case FETCH_MOVIE_DETAILS_RECEIVED:{
      const { data, movie_id } = action.payload;
      return{
        ...state,
        [movie_id]:{
          isRequested:false,
          isDataPresent:true,
          isError:false,
          data
        }
      }
    }
    case FETCH_MOVIE_DETAILS_ERROR:{
      const { movie_id, data } = action.payload
      return{
        ...state,
        [movie_id]:{
          isRequested:false,
          isDataPresent:false,
          isError:true,
          error:data
        }
      }
    }
    default:
      return state;
  }
};


export default movieDetailsReducer;
