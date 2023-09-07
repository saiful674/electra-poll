import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonPrimary from "./ButtonPrimary";

describe("ButtonPrimary", () => {
  test("renders the ButtonPrimary component with children", () => {
    const buttonText = "Click Me"; // Replace with your desired button text
    const { getByText } = render(<ButtonPrimary>{buttonText}</ButtonPrimary>);

    const button = getByText(buttonText);

    expect(button).toBeInTheDocument();
  });
});
