import {
    ADD_ORDER_REQUEST,
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_RESET,
    GET_ORDERS_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS
} from '../constants/orderConstants';
  
  export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_ORDER_REQUEST:
        return { loading: true };
      case ADD_ORDER_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };
      case ADD_ORDER_FAIL:
        return { loading: false, error: action.payload };
      case ADD_ORDER_RESET :
        return {}
      default:
        return state;
    }
  };

  export const OrdersReducer = (state = {orders : []}, action) => {
    switch(action.type) {
      case GET_ORDERS_REQUEST:
        return {loading: true};
      case GET_ORDERS_SUCCESS:
        return {orders : action.payload, loading: false};
      case GET_ORDERS_FAIL:
        return {loading: false, error: action.payload};
      default:
        return state
    }
  }

  
  export const OrderDetailReducer = (state = {order : {}}, action) => {
    switch(action.type) {
      case GET_ORDER_REQUEST:
        return {loading: true};
      case GET_ORDER_SUCCESS:
        return {order : action.payload, loading: false};
      case GET_ORDER_FAIL:
        return {loading: false, error: action.payload};
      default:
        return state
    }
  }