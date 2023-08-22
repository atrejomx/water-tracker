import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Operation, WeightMeasure } from "../interfaces/common.interface";
import { RootState } from "../stores";
import { User } from "../interfaces/user.interface";
import moment from "moment";

export interface WaterConfig extends User {
  waterIntake: number;
}

export interface HistoryState {
  id?: string;
  operation: Operation;
  liters: number;
  date: number;
}

interface WaterIntakeState {
  waterConfig: WaterConfig;
  history: HistoryState[];
}

const initialState: WaterIntakeState = {
  waterConfig: {
    name: "Default name",
    weight: 70,
    weightMeasure: "kg",
    waterIntake: 2.45,
  },
  history: [],
};

const waterIntakeSlice = createSlice({
  name: "waterIntake",
  initialState,
  reducers: {
    setWaterConfig: (
      state: WaterIntakeState,
      action: PayloadAction<WaterConfig>
    ) => {
      state.waterConfig = action.payload;
    },
    addToHistory: (
      state: WaterIntakeState,
      action: PayloadAction<HistoryState>
    ) => {
      const newHistory = {
        ...action.payload,
        id: `${Date.now()}-${Math.random() * 100}`,
      };

      state.history.push(newHistory);
    },
    removeFromHistory: (
      state: WaterIntakeState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.history.findIndex(
        (data) => data.id === action.payload.id
      );

      if (index !== -1) {
        state.history.splice(index, 1);
      }
    },
  },
});

export const { setWaterConfig, addToHistory, removeFromHistory } =
  waterIntakeSlice.actions;

export const selectWaterConfig = (state: RootState) =>
  state.waterIntakeSlice.waterConfig;

export default waterIntakeSlice.reducer;
