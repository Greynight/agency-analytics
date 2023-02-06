import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";
import { CITIES } from "../../config";

describe("Tabs", () => {
  afterEach(cleanup);

  it("renders the tabs for all cities", () => {
    const api = jest.fn();
    const { getAllByTestId } = render(<Tabs api={api} />);
    const tabs = getAllByTestId("tab-item");
    expect(tabs.length).toBe(CITIES.length);
    tabs.forEach((tab, i) => {
      expect(tab.textContent).toBe(CITIES[i]);
    });
  });

  it("calls the API when a tab is clicked", () => {
    const api = jest.fn().mockResolvedValue({});
    const { getAllByTestId } = render(<Tabs api={api} />);
    const tabs = getAllByTestId("tab-item");
    fireEvent.click(tabs[0]);
    expect(api).toHaveBeenCalledWith(CITIES[0]);
  });
});
