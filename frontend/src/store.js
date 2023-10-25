import { applyMiddleware, combineReducers, configureStore, legacy_createStore as createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
// Define a dummy reducer or import your actual reducers here
const reducer=combineReducers({
  products:productsReducer,
  productDetails:productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,  
  newReview:newReviewReducer,
  newProduct :newProductReducer,
  product:productReducer,
  order: orderReducer,
  allOrders: allOrdersReducer,
  allUsers : allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews : productReviewsReducer,
  review : reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware=[thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;