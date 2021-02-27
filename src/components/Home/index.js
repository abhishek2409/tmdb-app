import React, { useEffect} from 'react';
import { connect } from 'react-redux';

import { fetchMovies, setCurrentTab } from '../../actions'
import { getTrendingMovieData, getCurrentPlayingMovieData, getCurrentTab } from '../../reducers';
import { MOVIES_KEY, LIST_TITLES, LOADER_TYPE } from '../../constants';
import MoviesList from '../MoviesList'
import './style.css'
import GotoTop from '../GotoTop'
import Loaders from '../Loaders';
import ErrorDetails from '../Error'

const tabs = [
  {
    title:LIST_TITLES.trendingMovie,
    id:MOVIES_KEY.TRENDING,
  },
  {
    title:LIST_TITLES.currentPlayingMovie,
    id:MOVIES_KEY.CURRENT
  }
]

let Home = (props) => {
  const { fetchMovies, trendingMovie, currentPlayingMovie, setCurrentTab, currentTab } = props;

  const currentTrendingMoviePage = trendingMovie?.currentPage;
  const currentPlayingMovieCurrentPage = currentPlayingMovie?.currentPage;
  const trendingMovieDataPresent = trendingMovie?.isDataPresent
  const currentMovieDataPresent = currentPlayingMovie?.isDataPresent
  const trendingMovieLoading = trendingMovie?.isRequested;
  const currentPlayingMovieLoading = currentPlayingMovie?.isRequested;
  const trendingMovieError = trendingMovie?.isError
  const currentPlayingMovieError = currentPlayingMovie?.isError

  const trendingMovieErrorData = trendingMovie?.error
  const currentPlayingMovieErrorData = currentPlayingMovie?.error



  useEffect(() => {
    if(!trendingMovieDataPresent && currentTab === MOVIES_KEY.TRENDING){
      fetchMovies(currentTrendingMoviePage + 1, MOVIES_KEY.TRENDING)
    }
    if(!currentMovieDataPresent && currentTab === MOVIES_KEY.CURRENT){
      fetchMovies(currentPlayingMovieCurrentPage + 1, MOVIES_KEY.CURRENT)
    }
  }, [])

  const handleLoadMore = (page, key) => {
    fetchMovies(page, key)
  }

  const handleCurrentPayingMovieScroll = () => {
    if(currentPlayingMovieCurrentPage < currentPlayingMovie?.total_pages && !currentPlayingMovieLoading){
      handleLoadMore(currentPlayingMovieCurrentPage+1, MOVIES_KEY.CURRENT)
    }
  }

  const handleTrendingMovieScroll = () => {
    if(currentTrendingMoviePage < trendingMovie?.total_pages && !trendingMovieLoading){
      handleLoadMore(currentTrendingMoviePage+1, MOVIES_KEY.TRENDING)
    }
  }

  const trendingMoviesProps = {
    list: trendingMovie?.data,
    currentPage: currentTrendingMoviePage,
    isLoading:trendingMovieLoading,
    isDataPresent:trendingMovieDataPresent,
    isError:trendingMovie?.isError,
    handleLoadMore:handleTrendingMovieScroll,
    totalPages: trendingMovie?.total_pages
  }

  const currentPlayingMoviesProps = {
    list: currentPlayingMovie?.data,
    currentPage: currentPlayingMovieCurrentPage,
    isLoading:currentPlayingMovieLoading,
    isDataPresent:currentMovieDataPresent,
    isError:currentPlayingMovie?.isError,
    handleLoadMore:handleCurrentPayingMovieScroll,
    totalPages: currentPlayingMovie?.total_pages
  }

  const tabClickHandler = tab => {
    setCurrentTab(tab);
    switch (tab) {
      case  MOVIES_KEY.TRENDING:
        if(!trendingMovieDataPresent && !trendingMovieError){
          fetchMovies(currentTrendingMoviePage + 1, MOVIES_KEY.TRENDING)
        }
        break;
      case  MOVIES_KEY.CURRENT:
        if(!currentMovieDataPresent && !currentPlayingMovieError){
          fetchMovies(currentPlayingMovieCurrentPage + 1, MOVIES_KEY.CURRENT)
        }
        break;
      default:
        return;
    }
  }

  return (
    <div className="home--wrapper">
      <div className="home--wrapper__tabs">
        {tabs.map((tab) => {
          const { id, title } = tab
          return(
            <div key={id} className={`home--wrapper__tabs__item ${currentTab === id ? "active" : ""}`} onClick={e => tabClickHandler(tab.id)}>
              {title}
            </div>
          )
        })}
      </div>
      {(trendingMovieLoading && !trendingMovieDataPresent) || (currentPlayingMovieLoading && !currentMovieDataPresent) &&  (
        <Loaders type={LOADER_TYPE.LIST} />
      )}
      {(trendingMovieLoading && trendingMovieDataPresent) || (currentPlayingMovieLoading && currentMovieDataPresent) &&  (
        <Loaders type={LOADER_TYPE.SPINNER} />
      )}
      {currentTab ===  MOVIES_KEY.TRENDING && trendingMovieDataPresent ? (
        <MoviesList {...trendingMoviesProps} />
      ) : null}
      {currentTab ===  MOVIES_KEY.CURRENT && currentMovieDataPresent ? (
        <MoviesList {...currentPlayingMoviesProps} />
      ) : null}
      {(trendingMovieError && trendingMovieErrorData) || (currentPlayingMovieError && currentPlayingMovieErrorData) ? (
        <ErrorDetails msg={trendingMovieErrorData || currentPlayingMovieErrorData} />
      ) : null}
      <GotoTop/>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({
  trendingMovie: getTrendingMovieData(state),
  currentPlayingMovie: getCurrentPlayingMovieData(state),
  currentTab:getCurrentTab(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (page, key) => dispatch(fetchMovies(page, key)),
  setCurrentTab: tab => dispatch(setCurrentTab(tab))
});

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
