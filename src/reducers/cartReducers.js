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
} from '../constants/cartConstants';

export const cartListReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true, cart: [] };
    case GET_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload.cart,
      };
    case GET_CART_FAIL:
      return { loading: false, cart: [], error: action.payload };
    default:
      return state;
  }
};

export const deleteCartReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CART_REQUEST:
      return { loading: true };
    case DELETE_CART_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case DELETE_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editCartReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CART_REQUEST:
      return { loading: true };
    case EDIT_CART_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case EDIT_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
