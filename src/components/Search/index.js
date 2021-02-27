import React, { useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSearchData } from '../../reducers';
import { fetchSearchData } from '../../actions';
import MoviesList from '../MoviesList';
import './style.css';
import GotoTop from '../GotoTop'
import Loaders from '../Loaders'
import { LOADER_TYPE } from '../../constants'

let SearchPage = (props) => {
  const { keyword } = useParams();
  const { searchData, fetchSearchData } = props;

  const isLoading = searchData?.[keyword]?.isRequested;
  const isDataPresent = searchData?.[keyword]?.isDataPresent;
  const isError = searchData?.[keyword]?.isError;
  const currentPage = searchData?.[keyword]?.currentPage || 0
  const totalPages = searchData?.[keyword]?.total_pages
  const totalResults = searchData?.[keyword]?.total_results

  const handleSearchInit = () => {
    if(!isLoading && !isDataPresent && !isError){
      fetchSearchData(currentPage+1, keyword)
    }
  }

  useEffect(() => {
    if(!isDataPresent) handleSearchInit()
  })


  const handleSearchMovieScroll = () => {
    if(currentPage < totalPages && !isLoading){
      fetchSearchData(currentPage+1, keyword)
    }
  }

  const searchMoviesProps = {
    list:  searchData?.[keyword]?.data,
    currentPage,
    isLoading,
    isDataPresent,
    isError,
    handleLoadMore:handleSearchMovieScroll,
  }

  return (
    <div className="search--wrapper">
      <p className="font22">Search Result for: <strong>{keyword}</strong></p>
      {isDataPresent && <p>Results Found: {totalResults}</p>}
      {isDataPresent && <MoviesList {...searchMoviesProps} />}
      {isLoading && !isDataPresent &&  (
        <Loaders type={LOADER_TYPE.LIST} />
      )}
      <GotoTop />
    </div>
  );

}

const mapStateToProps = (state, ownProps) => ({
  searchData: getSearchData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearchData: (page, keyword) => dispatch(fetchSearchData(page, keyword)),
});

SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default SearchPage;
