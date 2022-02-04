import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCart } from '../actions/cartActions';
import Cart from '../components/Cart';
import Price from '../components/Price';
import Shipping from '../components/Shipping';

import '../styles/Cart.scss';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector(state => state.cartList);
  const { cart } = cartReducer;
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className='container'>
      <h3>Your Cart:</h3>
      <div className='cart-container'>
        <div className='cart-items'>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map(cartItem => {
              return <Cart key={cartItem._id} cartItem={cartItem} />;
            })
          ) : (
            <div>Your Cart is empty</div>
          )}
        </div>
        <div className="shipping-container">
          <Price />
          <Shipping />
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
