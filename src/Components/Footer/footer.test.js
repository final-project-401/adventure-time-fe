import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer', () => {
  test('renders social media logos', () => {
    render(<Footer />);
    const facebookLogo = screen.getByAltText('Facebook');
    const githubLogo = screen.getByAltText('GitHub');
    const twitterLogo = screen.getByAltText('Twitter');

    expect(facebookLogo).toBeInTheDocument();
    expect(githubLogo).toBeInTheDocument();
    expect(twitterLogo).toBeInTheDocument();
  });

  test('renders address', () => {
    render(<Footer />);
    const addressElement = screen.getByText('135 Trip St, Suite 4032 • Seattle WA 98101 • United States');
    expect(addressElement).toBeInTheDocument();
  });

  test('renders phone number', () => {
    render(<Footer />);
    const phoneNumberElement = screen.getByText('+ 123-456-789');
    expect(phoneNumberElement).toBeInTheDocument();
  });

  test('renders email', () => {
    render(<Footer />);
    const emailElement = screen.getByText('adventureTime@gmail.com');
    expect(emailElement).toBeInTheDocument();
  });

  test('renders the copyright text', () => {
    render(<Footer />);
    const copyRightElement = screen.getByText('©2023 AdventureTime');
    expect(copyRightElement).toBeInTheDocument();
  });
});
