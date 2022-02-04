import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Product = ({ product }) => {
  return (
    <li>
      <Link to={`/product/${product._id}`} className='product'>
        <figure>
          <img src={product.image} alt='' />
        </figure>
        <h3>{product.name}</h3>
        <span className='brand'>{product.brand}</span>
        <span className='price'>₹{product.price}</span>
      </Link>
    </li>
  );
};

export default Product;
