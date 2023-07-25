import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

jest.mock("@auth0/auth0-react");

describe("LogoutButton", () => {
  it("should render the button correctly when authenticated", () => {
    // Set isAuthenticated to true for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: true });

    render(<LogoutButton />);

    const signOutButton = screen.getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
  });

  it("should not render the button when not authenticated", () => {
    // Set isAuthenticated to false for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: false });

    render(<LogoutButton />);

    const signOutButton = screen.queryByText("Sign Out");
    expect(signOutButton).not.toBeInTheDocument();
  });

  it("should call the logout function on button click when authenticated", () => {
    // Set isAuthenticated to true for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: true });

    render(<LogoutButton />);

    // Mock the logout function
    const logoutMock = jest.fn();
    useAuth0.mockReturnValueOnce({ isAuthenticated: true, logout: logoutMock });

    // Simulate button click
    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    // Assert that logout was called
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it("should not call the logout function on button click when not authenticated", () => {
    // Set isAuthenticated to false for this test
    useAuth0.mockReturnValueOnce({ isAuthenticated: false });

    render(<LogoutButton />);

    // Mock the logout function
    const logoutMock = jest.fn();
    useAuth0.mockReturnValueOnce({ isAuthenticated: false, logout: logoutMock });

    // Simulate button click
    const signOutButton = screen.queryByText("Sign Out");
    fireEvent.click(signOutButton);

    // Assert that logout was not called
    expect(logoutMock).not.toHaveBeenCalled();
  });
});