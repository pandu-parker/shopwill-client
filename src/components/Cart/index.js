import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {  deleteCartItem, editCart } from '../../actions/cartActions';

import './style.scss';

const Cart = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  const [count, setCount] = useState(quantity);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteCartItem(cartItem._id));
  };
  const editCartHandler = () => {
    dispatch(editCart(product._id, count));
  };
  const decrementCart = () => {
    if (count === 1) return;
    setCount(count - 1);
  };
  return (
    <div className='cart-item'>
      <div className='item-desc'>
        {product ? (
          <div className='cart-product'>
            <figure>
              <img src={product.image} alt='' />
            </figure>
            <div>
              <p>Name :{product.name}</p>
              <p>₹{product.price}</p>
              <div>
                <button className='cart-btn button' onClick={decrementCart}>
                  -
                </button>
                <span>{count}</span>
                <button
                  className='cart-btn button'
                  onClick={e => setCount(count + 1)}
                >
                  +
                </button>
                <p>
                  <button className='button delete' onClick={deleteHandler}>
                    delete
                  </button>
                  {count !== quantity && (
                    <button onClick={editCartHandler} className='button'>
                      save
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            Product removed from catalogue
            <button className='button delete' onClick={deleteHandler}>
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
