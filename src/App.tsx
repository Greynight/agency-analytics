import React, { Component } from "react";

import "./App.scss";
import { DataContext, defaultState } from "./app-context";
import { AppState } from "./models";
import Tabs from "./components/tabs/Tabs";
import getWeatherForecast, { ForecastData } from "./services/weather-api";
import Current from "./components/current";
import Forecast from "./components/forecast";

class App extends Component {
  state: AppState = {
    ...defaultState,
  };

  async componentDidMount() {
    const weatherForecast = await getWeatherForecast(this.state.city);
    this.updateAppState(this.state.city, weatherForecast);
  }

  updateAppState = (city: string, weather: ForecastData): void => {
    console.log(weather);
    this.setState({
      city: city,
      weatherData: { ...weather },
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Container">
          <DataContext.Provider
            value={{
              ...this.state,
              updateAppState: this.updateAppState,
            }}
          >
            <Tabs api={getWeatherForecast} />
            <div className="weather-data">
              <Current {...this.state.weatherData.current} />
              <Forecast data={this.state.weatherData.forecast} />
            </div>
          </DataContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
