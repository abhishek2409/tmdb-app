import React from 'react';

import './style.css';

const ErrorDetails = ({msg, cssClass}) => {
  return (
    <div className={`error--wrapper ${cssClass}`}>
    <p>{msg}</p>
    </div>
  );
}


export default ErrorDetails;
