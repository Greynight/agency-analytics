import React, { Component } from "react";
import { DataContext } from "../../app-context";

interface TabItemProps {
  item: string;
  onSelect: any;
}

class TabItem extends Component<TabItemProps> {
  async handleTabClick(context: any) {
    const { updateAppState } = context;
    const weatherForecast = await this.props.onSelect(this.props.item);
    updateAppState(this.props.item, weatherForecast);
  }

  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <div
            className={
              context.city === this.props.item ? " Tab TabSelected" : "Tab"
            }
            onClick={() => this.handleTabClick(context)}
          >
            {this.props.item}
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default TabItem;
