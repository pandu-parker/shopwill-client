import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT
} from '../constants/userConstants';

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, message: 'Signup Successful' };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = { userInfo : {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
          return { loading: true };
        case USER_LOGIN_SUCCESS:
          return { loading: false, userInfo: {...state.userInfo, ...action.payload} };
        case USER_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case USER_LOGOUT:
          return {  userInfo : {} };
        default:
          return state;
      }
  };
  