import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from '../constants/categoryConstants';

export const categoriesReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true, products: [] };
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
