import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import productReducer from "./reducers/products";
import orderReducer from "./reducers/orders";

const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
