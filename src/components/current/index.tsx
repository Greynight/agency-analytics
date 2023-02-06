import React, { Component } from "react";

interface CurrentProps {
  icon: string;
  temperature: number;
  condition: string;
}

class Current extends Component<CurrentProps> {
  render() {
    return (
      <div className="current">
        <div className="current_title">Today</div>
        <div className="current_data">
          <img
            src={this.props.icon}
            className="current_data_icon"
            alt={this.props.condition}
          />
          <div className="current_data_conditions">
            <div className="current_data_conditions_temp">
              {this.props.temperature}°
            </div>
            <div className="current_data_conditions_text">
              {this.props.condition}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Current;
