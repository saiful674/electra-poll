import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonPrimary from "./ButtonPrimary";

describe("ButtonPrimary", () => {
  it("renders children correctly", () => {
    render(<ButtonPrimary>Click me</ButtonPrimary>);

    const button = screen.getByText("Click me");
  });
});
