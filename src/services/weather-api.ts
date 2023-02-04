import axios from "axios";
import { BASE_API_URL, DAYS } from "../config";

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

interface ApiData {
  forecast: any;
  current: any;
}

const mapCurrentData = (data: any): WeatherData => ({
  icon: data.condition.icon,
  condition: data.condition.text,
  temperature: data.temp_c,
});

const mapForecastData = (data: any): WeatherData[] =>
  data.map((dayData: any) => ({
    date: dayData.date,
    icon: dayData.day.condition.icon,
    condition: dayData.day.condition.text,
    temperature: dayData.day.maxtemp_c,
  }));

const getApiData = async (url: string): Promise<ApiData> => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    console.error(err);

    return {
      current: {},
      forecast: {},
    };
  }
};

const getWeatherForecast = async (city: string): Promise<ForecastData> => {
  const forecastWeatherApi = `${BASE_API_URL}/forecast.json?key=${process.env.REACT_APP_SECRET_KEY}&q=${city}&days=${DAYS}&aqi=no&alerts=no`;
  const weatherData = await getApiData(forecastWeatherApi);

  return {
    current: mapCurrentData(weatherData.current),
    forecast: mapForecastData(weatherData.forecast.forecastday),
  };
};

export default getWeatherForecast;
