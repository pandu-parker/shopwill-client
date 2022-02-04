import {
    GET_DEALS_REQUEST,
    GET_DEALS_FAIL,
    GET_DEALS_SUCCESS,
  } from '../constants/dealsConstants';
  
  
  export const dealsListReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
      case GET_DEALS_REQUEST:
        return { loading: true, cart: [] };
      case GET_DEALS_SUCCESS:
        return {
          loading: false,
          deals: action.payload,
        };
      case GET_DEALS_FAIL:
        return { loading: false, cart: [], error: action.payload };
      default:
        return state;
    }
  };