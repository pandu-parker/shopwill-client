import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { MdDone } from 'react-icons/md';
import './styles.scss';
import { ADD_ORDER_RESET } from '../../constants/orderConstants';
import { getOrders } from '../../actions/orderActions';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const newOrder = useSelector(state => state.newOrder);
  const { order: createdOrder } = newOrder;
  const [pay, setPay] = useState(false);
  const showRazorPay = async () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const orderId = await axios.post(
        '/api/orders/pay',
        { orderId: order._id },
        config
      );
      var options = {
        key: 'rzp_test_gEQ6omf9BZnOLE',
        amount: order.totalPrice,
        currency: 'INR',
        name: 'ShopWill',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: orderId.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
        handler: function (response) {
          axios
            .put(
              '/api/orders/pay',
              { orderId: order._id, response },
              config
            )
            .then(res => {
              alert('paymenty complete');
              dispatch(getOrders())
            }
              )
            .catch(err => alert('retry payment'));
        },
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert('PAyment failed');
      });
      rzp1.open();
    } };
  useEffect(() => {
    if ((createdOrder && order._id === createdOrder._id)) {
      showRazorPay();
      dispatch({ type: ADD_ORDER_RESET });
    }
  }, [order, dispatch, createdOrder, showRazorPay, userInfo.token]);
  return (
    <div className='order-item'>
      <p> <Link to={`/orders/${order._id}`}> Order Id :{order._id}</Link></p>
      <p>Price : ₹ {order.totalPrice}</p>
      <p>
        Delivered :{' '}
        {order.isDelivered ? (
          <span>{order.deliveredAt}</span>
        ) : (
          <span>Not delivered</span>
        )}
      </p>
      <div className='items'>
        <p>Items:</p>
        {order.orderItems.map(item => {
          return (
            <div key={item._id} className='order-product'>
              <figure>
                {' '}
                <img src={`/uploads/${item.image}`} alt='' />{' '}
              </figure>
              <div className='item-desc'>
                <p>
                  {item.name} x {item.qty}
                </p>
                <p>Price : {item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className='payment-status'>
        Payment Status :{' '}
        {order.isPaid ? (
          <MdDone className='paid-svg' />
        ) : (
          <>
            <span>Not Paid</span>
            <button className='button pay-button' onClick={showRazorPay}>
              Click here to Pay
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default Order;
