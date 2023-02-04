import React, { Component } from "react";
import { WeatherData } from "../../services/weather-api";
import { WEEKDAYS } from "../../config";

interface ForecastProps {
  data: WeatherData[];
}

class Forecast extends Component<ForecastProps> {
  render() {
    return (
      <div className="forecast-container">
        {this.props.data.map((item: WeatherData) => (
          <div className="forecast">
            <div className="forecast_day">
              {WEEKDAYS[new Date(`${item.date}`).getDay()]}
            </div>
            <img src={item.icon} />
            <div className="forecast_temp">{item.temperature}°</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Forecast;
