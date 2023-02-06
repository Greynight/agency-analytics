import { createContext } from "react";
import { AppState } from "./models";
import { CITIES } from "./config";

export const defaultState = {
  weatherData: {
    forecast: [
      {
        icon: "",
        condition: "",
        temperature: 0,
      },
    ],
    current: {
      icon: "",
      condition: "",
      temperature: 0,
    },
  },
  city: CITIES[0],
};

const defaultContextValue = {
  ...defaultState,
  updateAppState: () => {},
};

export const DataContext = createContext<
  AppState & {
    updateAppState: any;
  }
>({
  ...defaultContextValue,
});
