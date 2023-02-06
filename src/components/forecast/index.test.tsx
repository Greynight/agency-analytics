import React from "react";
import { render, cleanup } from "@testing-library/react";
import Forecast from "./index";
import { WeatherData } from "../../models";
import { WEEKDAYS } from "../../config";

afterEach(cleanup);

const mockData: WeatherData[] = [
  {
    date: "2022-12-23",
    icon: "icon1",
    condition: "clear",
    temperature: 20,
  },
  {
    date: "2022-12-24",
    icon: "icon2",
    condition: "cloudy",
    temperature: 15,
  },
  {
    date: "2022-12-25",
    icon: "icon3",
    condition: "rainy",
    temperature: 10,
  },
];

describe("Forecast component", () => {
  it("renders forecast data correctly", () => {
    const { getByText } = render(<Forecast data={mockData} />);

    mockData.forEach(({ date, temperature }) => {
      // @ts-ignore
      const weekday = WEEKDAYS[new Date(date).getDay()];
      const expectedTemperature = `${temperature}°`;

      getByText(weekday);
      getByText(expectedTemperature);
    });
  });
});
