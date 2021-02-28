import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";

import { IMAGE_BASE_URL } from '../../constants'
import { getBackgroundImage } from '../../utils';
import './style.css';
import NOT_FOUND from '../../assets/images/not-found.png'
import IMAGE_LOADER from '../../assets/images/poster-image-loader.png'
import useIntersection from '../useIntersection';

const MovieCard = (props) => {
  const { poster_path, release_date, title, vote_average, id } = props
  const history = useHistory();
  const elementRef = useRef(null)
  const [isIntersectionDone, changeIntersetionState] = useState(false)
  const [posterImage, changePosterImage] = useState(IMAGE_LOADER)
  const isIntersected = useIntersection(elementRef);

  useEffect(() => {
    if(isIntersected && !isIntersectionDone){
      changeIntersetionState(true);
      let image = new Image();
      const path = poster_path ? IMAGE_BASE_URL.replace(/{size}/, "w500").replace(/{path}/, poster_path) : NOT_FOUND
      image.src = path;
      image.onload = () => {
        changePosterImage(path)
      }
    }
  }, [isIntersected])

  return (
    <div className="movie--card--wrapper" onClick={e=> history.push(`/movieDetails/${id}`)}  ref={elementRef}>
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
