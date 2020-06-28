import PropTypes from 'prop-types';
import React from 'react';

const ReviewStars = ({ starCount, reviewCount = 0 }) => {
  let stars = [];
  if (starCount) {
    [...Array(Math.floor(starCount))].map((_e, i) => {
      stars.push(<i key={i} className='fas fa-star'></i>);
    });
    if (starCount - Math.floor(starCount) >= 0.5) {
      stars.push(<i key={starCount} className='fas fa-star-half-alt'></i>);
    }
  }
  let emptyStarsCount = 5 - stars.length;
    [...Array(emptyStarsCount)].map((_e, i) => {
      stars.push(<i key={starCount - 1 + i} className='far fa-star'></i>);
    });
  return (
    <div className='review-stars'>
      {stars}
      <span className='review-count'>({reviewCount})</span>
    </div>
  );
};

export default ReviewStars;
