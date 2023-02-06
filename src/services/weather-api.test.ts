import getWeatherForecast from "./weather-api";
import axios from "axios";

jest.mock("axios");

describe("getWeatherForecast", () => {
  it("should return forecast data when the API call is successful", async () => {
    const mockData = {
      current: {
        condition: {
          icon: "mock_icon",
          text: "mock_condition",
        },
        temp_c: 20,
      },
      forecast: {
        forecastday: [
          {
            date: "2023-02-04",
            day: {
              condition: {
                icon: "mock_forecast_icon",
                text: "mock_forecast_condition",
              },
              maxtemp_c: 25,
            },
          },
        ],
      },
    };

    (axios as any).mockResolvedValue({ data: mockData });

    const city = "San Francisco";
    const result = await getWeatherForecast(city);

    expect(result).toEqual({
      current: {
        icon: "mock_icon",
        condition: "mock_condition",
        temperature: 20,
      },
      forecast: [
        {
          date: "2023-02-04",
          icon: "mock_forecast_icon",
          condition: "mock_forecast_condition",
          temperature: 25,
        },
      ],
    });
  });
});
