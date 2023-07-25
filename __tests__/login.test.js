import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import MockAdapter from "jest-mock-axios";

jest.mock("@auth0/auth0-react");

describe("LoginButton", () => {
  let mockAxios;

  beforeEach(() => {
    // Clear any previous mocks and reset the module
    jest.clearAllMocks();
    jest.resetModules();

    // Create a new mock instance for axios
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    // Clean up any pending requests from the axios mock
    mockAxios.reset();
  });

  it("should render the button correctly when not authenticated", () => {
    // Set isAuthenticated to false for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: false });

    render(<LoginButton />);

    const signInButton = screen.getByText("Sign in");
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveClass("cool-button");
  });

  it("should not render the button when authenticated", () => {
    // Set isAuthenticated to true for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: true });

    render(<LoginButton />);

    const signInButton = screen.queryByText("Sign in");
    expect(signInButton).not.toBeInTheDocument();
  });

  it("should handle login on button click", async () => {
    // Set isAuthenticated to false for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: false });

    render(<LoginButton />);

    const signInButton = screen.getByText("Sign in");

    // Mock the loginWithRedirect function
    const loginWithRedirectMock = jest.fn();
    useAuth0.mockReturnValueOnce({ isAuthenticated: false, loginWithRedirect: loginWithRedirectMock });

    // Simulate button click
    fireEvent.click(signInButton);

    // Assert that loginWithRedirect was called
    expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
  });

  it("should handle login with user email when authenticated", async () => {
    // Set isAuthenticated to true and provide a user email for this test
    const userEmail = "test@example.com";
    useAuth0.mockReturnValueOnce({ isAuthenticated: true, user: { email: userEmail } });

    render(<LoginButton />);

    // Assert that the handleLogin function was called with the correct email
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER}/api/user`,
      {
        email: userEmail,
      }
    );
  });

  it("should handle login with user email when authenticated and user email is null", async () => {
    // Set isAuthenticated to true and provide a null user email for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: true, user: { email: null } });

    render(<LoginButton />);

    // Assert that the handleLogin function was not called
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it("should handle errors during login", async () => {
    // Set isAuthenticated to true and provide a user email for this test
    const userEmail = "test@example.com";
    useAuth0.mockReturnValueOnce({ isAuthenticated: true, user: { email: userEmail } });

    // Mock axios to simulate an error during login
    const errorResponse = new Error("Login failed");
    mockAxios.post.mockRejectedValueOnce(errorResponse);

    render(<LoginButton />);

    // Assert that the error was logged
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });
});