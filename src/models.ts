export interface WeatherData {
  date?: string;
  icon: string;
  condition: string;
  temperature: number;
}

export interface ForecastData {
  current: WeatherData;
  forecast: WeatherData[];
}

export interface ApiData {
  forecast: any;
  current: any;
}

export interface AppState {
  weatherData: ForecastData;
  city: string;
}
