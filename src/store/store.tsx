import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import mainComponentReducer from "./mainComponentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mainComponent: mainComponentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
