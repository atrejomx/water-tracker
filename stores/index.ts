import { configureStore } from "@reduxjs/toolkit";
import waterIntakeSlice from "../features/waterIntake.slice";

export const store = configureStore({
  reducer: {
    waterIntakeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
