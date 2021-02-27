import React, { useState, useEffect } from 'react';

import './style.css'

const GotoTop = () => {
  const [showGotoTop, setGotoTop] = useState(false)

  useEffect(() => {
    function handleScroll(e){
      const windowY = window.scrollY
      const windowHeight =  window.innerHeight
      if(windowY >= windowHeight){
        setGotoTop(true);
      }else{
        setGotoTop(false);
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const gotoTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  if(showGotoTop){
    return(
      <span className="gototop" onClick={gotoTop}>Go to top</span>
    )
  }

  return null
}

export default GotoTop;
