import {
  FETCH_MOVIES_REQUESTED,
  FETCH_MOVIES_RECEIVED,
  FETCH_MOVIES_ERROR,
  SET_CURRENT_TAB,
  MOVIES_KEY
} from '../constants';

const initialState = {
  trendingMovie:{
    currentPage:0,
    data:[],
    isRequested:true,
    isError:false,
    isDataPresent:false,
    total_pages:0
  },
  currentPlayingMovie:{
    currentPage:0,
    data:[],
    isRequested:false,
    isDataPresent:false,
    isError:false,
    total_pages:0
  },
  currentTab:MOVIES_KEY.TRENDING
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:{
      return{
        ...state,
        currentTab:action.payload

      }
    }
    case FETCH_MOVIES_REQUESTED:{
      return{
        ...state,
        [action.payload]:{
          ...state.[action.payload],
          isRequested:true
        }
      }
    }
    case FETCH_MOVIES_RECEIVED:{
      const { data:{page:currentPage, results, total_pages}, key } = action.payload;
      return{
        ...state,
        [key]:{
          ...state.[key],
          currentPage,
          data:[...state.[key].data, ...results],
          isRequested:false,
          isDataPresent:true,
          isError:false,
          total_pages
        }
      }
    }
    case FETCH_MOVIES_ERROR:{
      const { key, data } = action.payload
      return{
        ...state,
        [key]:{
          ...state.[key],
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

export const getTrendingMovie = state => state.trendingMovie
export const getCurrentMovie = state => state.currentPlayingMovie
export const getCurrentTab = state => state.currentTab;

export default homeReducer;
