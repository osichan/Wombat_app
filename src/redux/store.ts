import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "./reducers/userInfoReducer";

export const store = configureStore({
  reducer: {
    userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
