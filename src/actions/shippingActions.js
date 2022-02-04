import axios from 'axios';
import {
  ADD_NEW_SHIPPING_REQUEST,
  ADD_NEW_SHIPPING_SUCCESS,
  ADD_NEW_SHIPPING_FAIL,
  DELETE_SHIPPING_REQUEST,
  DELETE_SHIPPING_SUCCESS,
  DELETE_SHIPPING_FAIL,
} from '../constants/shippingConstants';

import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

export const addShippingAddress =
  shippingAddress => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_NEW_SHIPPING_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/users/shipping',
        shippingAddress,
        config
      );
      dispatch({
        type: ADD_NEW_SHIPPING_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ADD_NEW_SHIPPING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteShippingAddress = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_SHIPPING_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/shipping/${id}`, config);
    dispatch({
      type: DELETE_SHIPPING_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DELETE_SHIPPING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
