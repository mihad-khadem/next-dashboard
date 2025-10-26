import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";
import usersReducer from "./slices/usersSlice";
import uiReducer from "./slices/uiSlice";
import posReducer from "./slices/posSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    ui: uiReducer,
    pos: posReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
