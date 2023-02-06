import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TabItem from "./TabItem";
import { DataContext, defaultState } from "../../app-context";

const mockUpdateAppState = jest.fn();
const contextValue = {
  ...defaultState,
  city: "London",
  updateAppState: mockUpdateAppState,
};

const mockOnSelect = jest.fn().mockResolvedValue({});

const setup = (props = {}) => {
  return render(
    <DataContext.Provider value={contextValue}>
      <TabItem {...props} onSelect={mockOnSelect} item="London" />
    </DataContext.Provider>
  );
};

describe("TabItem", () => {
  it("should render correctly", async () => {
    const { getByText } = setup();
    const tabItem = getByText("London");
    expect(tabItem).toBeInTheDocument();
  });

  it("should have selected class when city matches item", async () => {
    const { getByText } = setup();
    const tabItem = getByText("London");
    expect(tabItem).toHaveClass("Tab TabSelected");
  });

  it("should call onSelect when tab is clicked", async () => {
    const { getByText } = setup();
    const tabItem = getByText("London");
    fireEvent.click(tabItem);
    await waitFor(() => expect(mockOnSelect).toHaveBeenCalled());
  });

  it("should update app state when onSelect resolves", async () => {
    const { getByText } = setup();
    const tabItem = getByText("London");
    fireEvent.click(tabItem);
    await waitFor(() => expect(mockUpdateAppState).toHaveBeenCalled());
  });
});
