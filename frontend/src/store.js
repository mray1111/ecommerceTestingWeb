import { applyMiddleware, combineReducers, configureStore, legacy_createStore as createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

// Define a dummy reducer or import your actual reducers here
const reducer=combineReducers({
  products:productReducer,
  productDetails:productDetailsReducer,
  user:userReducer
});

const initialState = {};

const middleware=[thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;