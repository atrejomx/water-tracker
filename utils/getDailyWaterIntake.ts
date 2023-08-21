import { IntakeMeasure, WeightMeasure } from "../interfaces/common.interface";

export const getDailyWaterIntake = (weightInKg: number): number => {
  if (typeof weightInKg !== "number") {
    return 0;
  }

  return weightInKg * 0.035; //L
};

export const convertLToOz = (liters: number) => liters * 33.814;
