import React from 'react';
import Header from './index';
import { render, screen, fireEvent } from "@testing-library/react";


describe('Header component', () => {
    test('renders header text', () => {
      render(<Header />);
      const headerText = screen.getByText('Adventure Time');
      expect(headerText).toBeInTheDocument();
    });
  
    test('renders menu button', () => {
      render(<Header />);
      const menuButton = screen.getByLabelText('menu');
      expect(menuButton).toBeInTheDocument();
    });
  
    test('opens and closes drawer when menu button is clicked', () => {
      render(<Header />);
      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);
      const drawer = screen.getByRole('presentation');
      expect(drawer).toHaveAttribute('open');
  
      fireEvent.click(drawer);
      expect(drawer).not.toHaveAttribute('open');
    });
  
    test('renders login, profile, and logout buttons', () => {
      render(<Header />);
      const loginButton = screen.getByText('Login');
      const profileButton = screen.getByText('Profile');
      const logoutButton = screen.getByText('Logout');
  
      expect(loginButton).toBeInTheDocument();
      expect(profileButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });

});