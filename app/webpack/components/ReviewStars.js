import PropTypes from 'prop-types';
import React from 'react';

const ReviewStars = ({ rating, reviewCount = 0 }) => {
  let stars = [];
  if (rating) {
    [...Array(Math.floor(rating))].map((_e, i) => {
      stars.push(<i key={i} className='fas fa-star'></i>);
    });
    if (rating - Math.floor(rating) >= 0.5) {
      stars.push(<i key={rating} className='fas fa-star-half-alt'></i>);
    }
  }
  let emptyRating = 5 - stars.length;
    [...Array(emptyRating)].map((_e, i) => {
      stars.push(<i key={rating - 1 + i} className='far fa-star'></i>);
    });
  return (
    <div className='review-stars'>
      {stars}
      <span className='review-count'>({reviewCount})</span>
    </div>
  );
};

export default ReviewStars;
