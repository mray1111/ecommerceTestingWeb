import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";


// Define a dummy reducer or import your actual reducers here


const initialState = {};

const store = configureStore({
  reducer: {
    // Add your actual reducers here when you have them
    // For now, you can include the dummyReducer
    products: productReducer,
    productDetails:productDetailsReducer
  },
  preloadedState: initialState,
  middleware: [thunk],
  devTools: composeWithDevTools(),
});

export default store;