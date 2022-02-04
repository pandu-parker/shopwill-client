import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Price = () => {
  const cartList = useSelector(state => state.cartList);
  const { cart } = cartList;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!cart || (!Array.isArray(cart) && !cart.length)) {
      setTotalPrice(0);
      return;
    }

    if (cart && cart.length) {
      let calcPrice = 0;
      cart.forEach(item => {
        console.log(item.quantity);
        console.log(item.product.price);
        calcPrice =
          calcPrice +
          (item.quantity * (item.product.price ? item.product.price : 0));
      });
      setTotalPrice(calcPrice);
    }
  }, [cart]);

  return <div>Total Price : ₹ {totalPrice}</div>;
};

export default Price;
