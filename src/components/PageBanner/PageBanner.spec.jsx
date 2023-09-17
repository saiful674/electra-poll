import React from "react";
import { render, screen } from "@testing-library/react";
import PageBanner from "./PageBanner";
import { MemoryRouter } from "react-router-dom";

describe("PageBanner component", () => {
  it("renders without errors", () => {
    render(
      <MemoryRouter>
        <PageBanner />
      </MemoryRouter>
    );

    // Check if the component is rendered
    const pageBanner = screen.getByTestId("page-banner");
    expect(pageBanner).toBeInTheDocument();

    // Check if the title is rendered

    // Check if the Home link is rendered
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();

    // Check if the PageRoute link is rendered
  });
});
