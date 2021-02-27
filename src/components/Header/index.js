import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'

import LOGO from '../../assets/images/logo.png';
import SEARCH_ICON from '../../assets/images/search.png';
import './style.css';

const Header = (props) => {
  const history = useHistory();
  const [text, changeText] = useState("")

  useEffect(() => {
    if(window.location.pathname.indexOf("/search/") === 0){
      const keyword = window.location.pathname.substr(8)
      if(keyword) changeText(keyword);
    }
  }, [])

  const submitHandler = e => {
    e.preventDefault();
    if(!text) return;
    history.push(`/search/${text}`)
  }

  return (
    <div className="movie--header">
      <div className="movie--header--container makeFlex spaceBtwn">
        <Link to="/"><img src={LOGO} className="movie--header__logo" alt="MovieDb Logo" /></Link>
        <form onSubmit={submitHandler}>
          <div className="movie--header--input--box">
            <input className="movie--header--input--box__input" type="text" value={text} placeholder="Enter your search keyword here....." onChange={e=> changeText(e.target.value)} />
            <button type="submit" className="movie--header--input--box__btn">
              <img src={SEARCH_ICON} alt="search btn" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Header;
