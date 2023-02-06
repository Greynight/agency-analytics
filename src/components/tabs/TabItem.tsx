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

  async handleTabPress(
    event: React.KeyboardEvent<HTMLDivElement>,
    context: any
  ) {
    if (event.code === "Space" || event.code === "Enter") {
      await this.handleTabClick(context);
    }
  }

  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <div
            tabIndex={0}
            aria-selected={context.city === this.props.item}
            data-testid="tab-item"
            role="tab"
            className={
              context.city === this.props.item ? "Tab TabSelected" : "Tab"
            }
            onClick={() => this.handleTabClick(context)}
            onKeyUp={(event) => this.handleTabPress(event, context)}
          >
            {this.props.item}
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default TabItem;
