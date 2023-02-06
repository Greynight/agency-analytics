import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import getWeatherForecast from "./services/weather-api";

jest.mock("./services/weather-api", () => {
  return jest.fn(() =>
    Promise.resolve({
      current: {
        date: "2023-02-04",
        icon: "clear-night",
        condition: "Clear",
        temperature: 60,
      },
      forecast: [
        {
          date: "2023-02-05",
          icon: "cloudy",
          condition: "Cloudy",
          temperature: 55,
        },
        {
          date: "2023-02-06",
          icon: "rain",
          condition: "Rain",
          temperature: 50,
        },
      ],
    })
  );
});

describe("App component", () => {
  it("should render the component", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(container).toBeTruthy();
  });

  it("should fetch weather data and update the state", async () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/?city=Gdansk"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByText("Clear"));
    await waitFor(() => screen.findByText("60°"));

    expect(getWeatherForecast).toHaveBeenCalledWith("Gdansk");
    expect(getByLabelText("Current weather conditions")).toHaveTextContent(
      "Clear"
    );
    expect(getByLabelText("Current temperature")).toHaveTextContent("60°");
  });

  it("should update the app state when a tab is clicked", async () => {
    const {} = render(
      <MemoryRouter initialEntries={["/?city=Gdansk"]}>
        <App />
      </MemoryRouter>
    );

    const tab = await waitFor(() => screen.findByText("Toronto"));
    fireEvent.click(tab);
    await waitFor(() => screen.getByLabelText("Forecast temperature"));
    expect(getWeatherForecast).toHaveBeenCalledWith("Toronto");

    await waitFor(() =>
      expect(
        screen.getAllByLabelText("Forecast temperature")[0]
      ).toHaveTextContent("55°")
    );
  });
});
