import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { v4 as uuid } from 'uuid'

import './style.scss';

const Rating = ({ value, totalRatings }) => {
  const valueArr = [];
  for (let i = 1; i < 6; i++) {
    if (value >= i) {
      valueArr.push(<BsStarFill key={uuid()} />);
    } else if (Math.ceil(value) === i) {
      valueArr.push(<BsStarHalf key={uuid()} />);
    } else {
      valueArr.push(<BsStar key={uuid()} />);
    }
  }
  return (
    <div className='rating-container'>
      {/* <span className='number'>{value}</span> */}
      <span className='stars'>{valueArr}</span>
      <span className='rating-count'>From: {totalRatings} ratings</span>
    </div>
  );
};

export default Rating;
