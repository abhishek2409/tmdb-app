import {
  FETCH_SEARCH_REQUESTED,
  FETCH_SEARCH_RECEIVED,
  FETCH_SEARCH_ERROR
} from '../constants';

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUESTED:{
      return{
        ...state,
        [action.payload]:{
          ...(state?.[action.payload] || {}),
          isRequested:true
        }
      }
    }
    case FETCH_SEARCH_RECEIVED:{
      const { data:{page:currentPage, results, total_pages, total_results}, key } = action.payload;
      return{
        ...state,
        [key]:{
          ...(state?.[key] || {}),
          currentPage,
          data:[...(state?.[key]?.data ||  []), ...results],
          isRequested:false,
          isDataPresent:true,
          isError:false,
          total_results,
          total_pages
        }
      }
    }
    case FETCH_SEARCH_ERROR:{
      const { key } = action.payload
      return{
        ...state,
        [key]:{
          ...(state?.[key] || {}),
          isRequested:false,
          isDataPresent:false,
          isError:true,
        }
      }
    }
    default:
      return state;
  }
};


export default searchReducer;
