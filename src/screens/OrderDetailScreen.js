import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOrder } from '../actions/orderActions';
import Order from '../components/OrderDetail';

const OrdersScreen = ({match}) => {
  const dispatch = useDispatch();
  const orderId = match.params.id
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch]);
  const orderDetailReducer = useSelector(state => state.orderDetail);
  const { order } = orderDetailReducer;
  console.log(order)
  return (
    <div className='container'>
    {order && order._id &&
      <Order order={order} />
    }
    </div>
  );
};

export default OrdersScreen;
