import React, { Component } from "react";
import TabItem from "./TabItem";
import { CITIES } from "../../config";

interface TabsProps {
  api: any;
}

class Tabs extends Component<TabsProps> {
  render() {
    return (
      <div className="Tabs">
        {CITIES.map((city) => (
          <TabItem key={city} item={city} onSelect={this.props.api} />
        ))}
      </div>
    );
  }
}

export default Tabs;
