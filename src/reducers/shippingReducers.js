import {
  ADD_NEW_SHIPPING_FAIL,
  ADD_NEW_SHIPPING_REQUEST,
  ADD_NEW_SHIPPING_SUCCESS,
  DELETE_SHIPPING_FAIL,
  DELETE_SHIPPING_REQUEST,
  DELETE_SHIPPING_SUCCESS,
} from '../constants/shippingConstants';

export const addNewShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_SHIPPING_REQUEST:
      return { loading: true };
    case ADD_NEW_SHIPPING_SUCCESS:
      return { loading: false, ...action.payload };
    case ADD_NEW_SHIPPING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SHIPPING_REQUEST:
      return { loading: true };
    case DELETE_SHIPPING_SUCCESS:
      return { loading: false, ...action.payload };
    case DELETE_SHIPPING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
