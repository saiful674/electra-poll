import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blog from "./Blog";
import { MemoryRouter } from "react-router-dom";

// Mock axios.get to return some sample data
jest.mock("axios");

describe("Blog Component", () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("renders the Blog component correctly", async () => {
    // Mock axios.get to return some sample data
    axios.get.mockResolvedValueOnce({
      data: [
        {
          _id: 1,
          title: "Sample Blog 1",
          content: "This is a sample blog content.",
        },
        {
          _id: 2,
          title: "Sample Blog 2",
          content: "This is another sample blog content.",
        },
      ],
    });

    renderComponent();

    // Wait for the component to fetch data
    await waitFor(() => screen.getByText("Sample Blog 1"));

    // Check if the component renders correctly
    // expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Sample Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Blog 2")).toBeInTheDocument();
  });

  it("handles error state correctly", async () => {
    // Mock axios.get to simulate an error
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    renderComponent();
  });
});
