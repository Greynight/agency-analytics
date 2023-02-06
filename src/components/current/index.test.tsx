import React from "react";
import { render } from "@testing-library/react";
import Current from "./index";

describe("Current component", () => {
  it("renders today's weather information", () => {
    const props = {
      icon: "test_icon",
      temperature: 20,
      condition: "cloudy",
    };

    const { getByText, getByAltText } = render(<Current {...props} />);

    const temperatureText = getByText("20°");
    const conditionText = getByText("cloudy");
    const icon = getByAltText("cloudy");

    expect(temperatureText).toBeInTheDocument();
    expect(conditionText).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "test_icon");
  });
});
