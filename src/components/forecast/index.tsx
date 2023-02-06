import React, { Component } from "react";
import { WEEKDAYS } from "../../config";
import { WeatherData } from "../../models";

interface ForecastProps {
  data: WeatherData[];
}

class Forecast extends Component<ForecastProps> {
  render() {
    return (
      <div className="forecast-container">
        {this.props.data.map((item: WeatherData, index) => (
          <div className="forecast" key={index}>
            <div className="forecast_day">
              {WEEKDAYS[new Date(`${item.date}`).getDay()]}
            </div>
            <img src={item.icon} alt={item.condition} />
            <div className="forecast_temp">{item.temperature}°</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Forecast;
