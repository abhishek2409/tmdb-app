import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './style.css'

let ReactShimmer = (props) => {
  const {
    wrapperStyle, width, height, duration, cssClass
  } = props

  const calcShimmerStyle = useCallback(() => {
    return{
      backgroundSize: `${width * 10}px ${height}px`,
      animationDuration: `${(duration / 1000).toFixed(1)}s`
    }
  })

  const shimmerStyle = {
    ...wrapperStyle,
    ...calcShimmerStyle(),
    height:`${height}px`,
    width:`${width}px`,
  }
  return (
    <div style={shimmerStyle} className={`${cssClass} shimmer`}></div>
  );
}

ReactShimmer.propTypes = {
  wrapperStyle: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  duration:PropTypes.number,
  cssClass:PropTypes.string
};
ReactShimmer.defaultProps = {
  wrapperStyle: {},
  width: 400,
  height: 400,
  duration:1600,
  cssClass:""
}

export default ReactShimmer;
