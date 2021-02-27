import React from 'react';

import './details-style.css';

const DetailsLoader = () => {
  return (
    <div className="details--loader--wrapper">
      <h2 className="details--loader--wrapper__title">Hold we are fetching details</h2>
      <div className="details--loader--wrapper__loader" />
    </div>
  );
}
export default DetailsLoader;
