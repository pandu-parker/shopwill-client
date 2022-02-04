import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ deal }) => {
    const percentage = 100 - (deal.product.salePrice / deal.product.price) * 100;
    return (
    <Link to={`/product/${deal.product._id}`} className='deal'>
      <figure>
        <img src={deal.product.image} alt='' />
      </figure>
      <div>
        <p>{deal.product.name}</p>
        <div className='price'>
          <span className='full-price'>₹{deal.product.price}</span>
          <span className='deal-price'>₹{deal.product.salePrice}</span>
          <span className='discount'>{percentage}% off</span>
        </div>
      </div>
    </Link>
  );
};

export default Product;
