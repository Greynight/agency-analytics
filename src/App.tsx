import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./App.scss";
import { DataContext, defaultState } from "./app-context";
import { AppState, ForecastData } from "./models";
import Tabs from "./components/tabs/Tabs";
import getWeatherForecast from "./services/weather-api";
import Current from "./components/current";
import Forecast from "./components/forecast";

interface Props extends RouteComponentProps {}

class App extends Component<Props, AppState> {
  state: AppState = {
    ...defaultState,
  };

  static getDerivedStateFromProps(props: Props, state: AppState): AppState {
    const { search } = props.location;
    const urlParams = new URLSearchParams(search);
    const city = urlParams.get("city");

    return {
      ...state,
      city: city ? city : state.city,
    };
  }

  async componentDidMount() {
    const weatherForecast = await getWeatherForecast(this.state.city);
    this.updateAppState(this.state.city, weatherForecast);
  }

  updateAppState = (city: string, weather: ForecastData): void => {
    this.setState({
      city: city,
      weatherData: { ...weather },
    });

    this.props.history.push(`/?city=${city}`);
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

export default withRouter(App);
