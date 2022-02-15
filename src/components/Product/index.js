import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Product = ({ product }) => {
  const image = product.images[0] ? product.images[0].path : `/uploads/sample.jpg`;
  return (
    <li>
      <Link to={`/product/${product._id}`} className='product'>
        <figure>
          <img src={`${process.env.REACT_APP_BASE_URL}${image}`} alt='' />
        </figure>
        <h3>{product.name}</h3>
        <span className='brand'>{product.brand}</span>
        <span className='price'>₹{product.price}</span>
      </Link>
    </li>
  );
};

export default Product;
