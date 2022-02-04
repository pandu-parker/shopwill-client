import {
  GET_BANNERS_FAIL,
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
} from '../constants/homepageConstants';

export const bannersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BANNERS_REQUEST:
      return { loading: true };
    case GET_BANNERS_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case GET_BANNERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
