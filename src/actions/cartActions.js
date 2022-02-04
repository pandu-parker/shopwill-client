import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  EDIT_CART_REQUEST,
  EDIT_CART_SUCCESS,
  EDIT_CART_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
} from '../constants/cartConstants';

import axios from 'axios';

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/cart/', config);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCartItem = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(config)
    const { data } = await axios.delete(`/api/cart/${id}`, config);
    dispatch({
      type: DELETE_CART_SUCCESS,
      payload: data,
    });
    dispatch(getCart())
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCart = (id, quantity) => async(dispatch, getState) =>{
  try {
    dispatch({ type: EDIT_CART_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/cart/`, {product: id, quantity} ,config);
    dispatch({
      type: EDIT_CART_SUCCESS,
      payload: data,
    });
    dispatch(getCart())
  } catch (error) {
    dispatch({
      type: EDIT_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const emptyCart = () => async(dispatch, getState) =>{
  try {
    dispatch({ type: EMPTY_CART_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/cart/`, config);
    dispatch({
      type: EMPTY_CART_SUCCESS,
      payload: data,
    });
    dispatch(getCart())
  } catch (error) {
    dispatch({
      type: EMPTY_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
