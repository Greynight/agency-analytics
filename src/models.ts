import { ForecastData } from "./services/weather-api";

export interface AppState {
  weatherData: ForecastData;
  city: string;
}
