import React from 'react';
import { Link } from 'react-router-dom';

const BarCard = ({ bar }) => {
  return(
    <div key={bar._id} className="card">
      <Link to={`/bars/${bar._id}`}>
        <div className="card-image">
          <img src={bar.image} className="index-photo" />
        </div>
        <div className="media-content">
          <p className="title is-4">{bar.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default BarCard;
