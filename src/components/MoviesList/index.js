import React, { useRef, useState, useEffect } from 'react';

import MovieCard from '../MovieCard';
import './style.css';


const MoviesList = (props) => {
  const { list, handleLoadMore } = props;
  const [loadMore, setLoadMore] = useState(false)
  const loadingRef = useRef();

  useEffect(() => {
    if(loadMore){
      handleLoadMore()
      setLoadMore(false);
    }
  }, [loadMore]);

  useEffect(() => {
    const listElem = loadingRef.current;
    function handleScroll(e){
      const windowHeight = window.scrollY + window.innerHeight
      const listElemHeight = listElem.clientHeight + listElem.offsetTop
      if(windowHeight >= (listElemHeight - 100)){
        setLoadMore(true);
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="movies--list--wrapper">
      <div className="makeFlex wrap" ref={loadingRef}>
        {list.length ? list.map((item) => {
          return(
            <MovieCard key={item.id} {...item}/>
          )
        }) : null}
      </div>
    </div>
  );
}

export default MoviesList;
