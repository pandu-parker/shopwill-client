import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  ProductListReducer,
  productDetailsReducer,
} from "./reducers/productsReducer";

import { userSignUpReducer, userLoginReducer } from "./reducers/userReducers";

import {
  cartListReducer,
  deleteCartReducer,
  editCartReducer,
} from "./reducers/cartReducers";

import {
  categoriesReducer,
} from "./reducers/categoryReducers";
import { bannersReducer } from "./reducers/homepageReducer";

import { newOrderReducer, OrdersReducer, OrderDetailReducer } from "./reducers/orderReducers";
import {
  addNewShippingReducer,
  deleteShippingReducer,
} from "./reducers/shippingReducers";
import { dealsListReducer } from "./reducers/dealsReducer";
import { searchReducer } from "./reducers/searchReducers";

const reducer = combineReducers({
  banners: bannersReducer,
  cartList: cartListReducer,
  categories: categoriesReducer,
  deleteCart: deleteCartReducer,
  editCart: editCartReducer,
  dealsList: dealsListReducer,
  productList: ProductListReducer,
  productDetails: productDetailsReducer,
  addNewShipping: addNewShippingReducer,
  deleteShipping: deleteShippingReducer,
  orders: OrdersReducer,
  orderDetail: OrderDetailReducer,
  newOrder: newOrderReducer,
  search: searchReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
});

const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromLocal } };

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
