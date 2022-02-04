import axios from 'axios';
import {
  ADD_ORDER_FAIL,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  // PAYMENT_REQUEST,
  // PAYMENT_SUCCESS,
  // PAYMENT_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
} from '../constants/orderConstants';

export const newOrder =
  (cartItems, shippingAddress) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_ORDER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const orderItems = cartItems.map(cartItem => {
        return {
          ...cartItem,
          price: cartItem.product.price,
          name: cartItem.product.name,
          image: 'sample.jpg',
          qty: cartItem.quantity,
        };
      });
      let totalPrice = 0;
      orderItems.forEach(item => {
        totalPrice = totalPrice + item.price * item.qty
      })
      const { data } = await axios.post(
        `/api/orders/`,
        { orderItems, shippingAddress, totalPrice },
        config
      );
      dispatch({
        type: ADD_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

