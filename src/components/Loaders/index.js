import React from 'react';

import ListLoader from './ListLoader'
import Spinner from './Spinner';
import DetailsLoader from './DetailsLoader';
import { LOADER_TYPE } from '../../constants';

const Loaders = ({type}) => {
  if(type === LOADER_TYPE.LIST){
    return(<ListLoader/>)
  }
  if(type === LOADER_TYPE.SPINNER){
    return(<Spinner/>)
  }
  if(type === LOADER_TYPE.DETAILS){
    return(<DetailsLoader/>)
  }
  return null;
}


export default Loaders;
