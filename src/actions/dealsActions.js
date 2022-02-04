import {
  GET_DEALS_REQUEST,
  GET_DEALS_FAIL,
  GET_DEALS_SUCCESS,
} from '../constants/dealsConstants';

import axios from 'axios';

export const getDeals = () => async dispatch => {
  try {
    dispatch({ type: GET_DEALS_REQUEST });
    const { data } = await axios.get('/api/deals/');
    dispatch({
      type: GET_DEALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEALS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
