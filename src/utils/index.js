/**
 * [getBackgroundImage will return backgroundImage]
 * @param  {string} imgSrc image source to set in the background
 * @return {object} style object with backgroundImage
 */
export const getBackgroundImage = (imgSrc) => {
  if(!imgSrc) return {}
  return{
    backgroundImage:`url(${imgSrc})`
  }
}

/**
 * [getCommaValueString return comma separated values from array of objects]
 * @param  {Array} arr array of objects
 * @return {string}    string of comma separated values
 */

export const getCommaValueString = (arr) => {
  return arr.map(item => item.name).join(", ")
}
