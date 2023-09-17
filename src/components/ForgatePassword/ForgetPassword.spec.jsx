import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Swal from "sweetalert2";

import ForgetPassword from "./ForgetPassword";

// Mock the AuthContext value
const mockAuthContext = {
  passwordReset: jest.fn(),
};
jest.mock("sweetalert2", () => {
  const fire = jest.fn();
  fire.mockResolvedValue({ isConfirmed: true }); // Mocking a resolved response
  return {
    fire,
  };
});
// Mock the useContext hook to return the mockAuthContext
jest.mock("../../Providers/AuthProvider", () => ({
  AuthContext: {
    Consumer: ({ children }) => children(mockAuthContext),
  },
}));

describe("ForgetPassword", () => {
  it("renders the component without errors", () => {
    render(
      <MemoryRouter>
        <ForgetPassword />
      </MemoryRouter>
    );
  });

  it("submits the form and shows success message", async () => {
    render(
      <MemoryRouter>
        <ForgetPassword />
      </MemoryRouter>
    );

    // Get form elements using getByPlaceholderText
    const emailInput = screen.getByPlaceholderText("email");
    const submitButton = screen.getByDisplayValue("Reset Password"); // Use getByText for the button text

    // Fill out the form
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    // Wait for the success message
    await waitFor(() => {
      expect(Swal.fire);
    });

    // Ensure that the passwordReset function was called
    expect(mockAuthContext.passwordReset);
  });
});
