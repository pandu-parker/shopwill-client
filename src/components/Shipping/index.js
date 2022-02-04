import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPlusMedical } from 'react-icons/bi';

import ShippingAddress from './ShippingAddress';
import AddNewShipping from './AddNewShipping';
import { emptyCart } from '../../actions/cartActions';
import { newOrder } from '../../actions/orderActions';

import './styles.scss';

const Shipping = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddresses } = userInfo;

  const cartReducer = useSelector(state => state.cartList);
  const { cart } = cartReducer;

  const newOrderReducer = useSelector(state => state.newOrder);

  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    if (shippingAddresses && shippingAddresses.length) {
      setActive(shippingAddresses[0]._id);
    }
  }, [shippingAddresses]);

  const orderHandler = () => {
    if (cart.length > 0) {
      const activeShipping = shippingAddresses.find(address => {
        return address._id === active
      })
      dispatch(newOrder(cart,activeShipping));
    } else {
      alert('Cart is empty');
    }
  };
  useEffect(() => {
    if (newOrderReducer && newOrderReducer.success) {
      dispatch(emptyCart());
      console.log(newOrderReducer)
      history.push(`/orders/${newOrderReducer.order._id}`);
    }
  }, [newOrderReducer, dispatch, history]);
  return (
    <div className='shipping-container'>
      {shippingAddresses &&
        Array.isArray(shippingAddresses) &&
        shippingAddresses.map(shippingAddress => (
          <ShippingAddress
            key={shippingAddress._id}
            {...shippingAddress}
            active={active}
            setActive={setActive}
          />
        ))}
      <div className='button-container'>
        {addNew ? (
          <AddNewShipping setAddNew={setAddNew} />
        ) : (
          <button
            className='button shipping-add'
            onClick={e => setAddNew(true)}
          >
            Add new shipping address
            <BiPlusMedical />
          </button>
        )}
        <button className='button primary' onClick={orderHandler}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default withRouter(Shipping);
