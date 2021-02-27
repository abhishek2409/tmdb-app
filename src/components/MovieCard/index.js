import React from 'react';
import { useHistory } from "react-router-dom";

import { IMAGE_BASE_URL } from '../../constants'
import { getBackgroundImage } from '../../utils';
import './style.css';
import NOT_FOUND from '../../assets/images/not-found.png'

const MovieCard = (props) => {
  const { poster_path, release_date, title, vote_average, id } = props
  const history = useHistory();
  const posterImage = poster_path ? IMAGE_BASE_URL.replace(/{size}/, "w500").replace(/{path}/, poster_path) : NOT_FOUND

  return (
    <div className="movie--card--wrapper" onClick={e=> history.push(`/movieDetails/${id}`)}>
      <div className="movie--card__poster bgProperties" style={getBackgroundImage(posterImage)} />
      <h3 className="movie--card__title medFont">{title}</h3>
      <div className="movie--card__desc">
        {release_date && <p>Release Date: {release_date}</p>}
        {vote_average && <p>Votes Avg.: {vote_average}</p>}
      </div>
    </div>
  );
}


export default MovieCard;
