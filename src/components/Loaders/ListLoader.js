import React from 'react';

import './list-style.css';
import Shimmer from '../Shimmer'

const ListLoader = () => {
  return (
    <div className="list-loader--wrapper">
      {
        [0,1,2,3,4,5,6,7].map((item, i) => (
          <Shimmer width={250} height={300} key={i}/>
        ))
      }
    </div>
  );
}


export default ListLoader;
