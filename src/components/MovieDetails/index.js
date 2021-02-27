import React, { useEffect, Fragment  } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { getMoviesData } from '../../reducers'
import { fetchMovieData } from '../../actions'
import { IMAGE_BASE_URL, LOADER_TYPE } from '../../constants'
import { getBackgroundImage, getCommaValueString } from '../../utils'
import './style.css'
import Loaders from '../Loaders';
import NOT_FOUND_POSTER from '../../assets/images/not-found.png';
import NOT_FOUND_BACKDROP from '../../assets/images/not-found-backdrop.png'

let MovieDetails = (props) => {
  const { movie_id } = useParams();
  const { moviesData, fetchMovieData } = props;

  const isLoading = moviesData?.[movie_id]?.isRequested;
  const isDataPresent = moviesData?.[movie_id]?.isDataPresent;
  const isError = moviesData?.[movie_id]?.isError;
  const movieDetails = moviesData?.[movie_id]?.data

  useEffect(() => {
    if(!isLoading && !isDataPresent && !isError){
      fetchMovieData(movie_id)
    }
  })

  if(isLoading){
    return(<Loaders type={LOADER_TYPE.DETAILS} />)
  }



  const gotoNextScreen = () => {
    const ele = document.getElementById('overview')
    ele.scrollIntoView({
      behavior: 'smooth'
    });
  }


  if(!isLoading && isDataPresent){
    const { backdrop_path, genres, homepage, imdb_id, overview, production_companies, production_countries, release_date, spoken_languages, title, vote_average, poster_path, tagline, status } = movieDetails
    const posterImage = poster_path ? IMAGE_BASE_URL.replace(/{size}/, "w500").replace(/{path}/, poster_path) : NOT_FOUND_POSTER
    const backdropImage = backdrop_path ? IMAGE_BASE_URL.replace(/{size}/, "original").replace(/{path}/, backdrop_path) : NOT_FOUND_BACKDROP

    console.log(NOT_FOUND_POSTER);

    return (
      <div className="movie--details--wrapper">
        <div className="movie--details__hero">
          <div className="movie--details__poster bgProperties" style={getBackgroundImage(backdropImage)} />
          <h1 className="movie--details__title">{title}</h1>
          {genres?.length ? (
            <div className="movie--details__genres">
              { genres.map((genre) => {
                const { id, name } = genre;
                return(
                  <span key={id} className="movie--details__genres--item">{name}</span>
                )
              })}
            </div>
          ) : null}
          {homepage && <div className="movie--detail__website"><a href={homepage} target="_blank" rel="noreferrer">Goto website</a></div>}
          <span onClick={gotoNextScreen} className="down--arrow" />
        </div>
        <div className="movie--details__overview" id="overview">
          <div className="makeFlex">
            <div className="movie--details__overview-poster bgProperties" style={getBackgroundImage(posterImage)} />
            <div className="movie--details__overview-desc flexOne">
              <h3 className="movie--details__overview-desc__title appendBottom20">
                {title}
                {tagline ? (
                  <Fragment><br /><i>{tagline}</i></Fragment>
                ) : null}
              </h3>
              <p className="appendBottom20">{overview}</p>
              {vote_average ? <p className="appendBottom10"><strong>Votes Count Avg.: </strong> {vote_average}</p> : null}
              {release_date ? <p className="appendBottom10"><strong>Release Date: </strong> {release_date}</p> : null}
              {status ? <p className="appendBottom10"><strong>Status: </strong> {status}</p> : null}
              {spoken_languages?.length ? (
                <div className="movie--details__overview-tags appendBottom10">
                  <strong>Spoken Languages: </strong>
                  {getCommaValueString(spoken_languages)}
                </div>
              ) : null}
              {production_companies?.length ? (
                <div className="movie--details__overview-tags appendBottom10">
                  <strong>Production Companies: </strong>
                  {getCommaValueString(production_companies)}
                </div>
              ) : null}
              {production_countries?.length ? (
                <div className="movie--details__overview-tags appendBottom10">
                  <strong>Production Countries: </strong>
                  {getCommaValueString(production_countries)}
                </div>
              ) : null}
              {imdb_id ? (
                <p className="appendBottom10">
                <strong>IMDB Link: </strong>
                <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${imdb_id}/`}>Go to IMDB</a></p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null
}

const mapStateToProps = (state, ownProps) => ({
  moviesData: getMoviesData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieData: (movie_id) => dispatch(fetchMovieData(movie_id)),
});

MovieDetails = connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
export default MovieDetails;
