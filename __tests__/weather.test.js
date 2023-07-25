import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Weather from "./Weather";

jest.mock("axios");

describe("Weather", () => {
  const mockWeatherData = [
    {
      data: [
        {
          date: "2023-07-25",
          weatherCode: 800,
          icon: "clear",
          temp: 75,
          description: "Clear sky",
          high_temp: 80,
          low_temp: 68,
          uvIndex: 5,
          windDir: "SW",
          windSpd: 10,
          humidity: 65,
          pressure: 1015,
          pop: 0,
        },
        // Add more data for other forecast days if needed
      ],
      state: "Some State",
    },
  ];

  // Mock the Axios get function to return the mockWeatherData
  axios.get.mockResolvedValue({ data: mockWeatherData });

  it("should render the weather card with correct data", async () => {
    const mockPostcode = 98032;

    render(<Weather postcode={mockPostcode} />);

    // Wait for the weather data to load asynchronously
    const loadingElement = await screen.findByText("Loading...");

    // Expect that the loading text is displayed while the data is loading
    expect(loadingElement).toBeInTheDocument();

    // Wait for the weather data to load completely
    const cityElement = await screen.findByText(`${mockPostcode}, ${mockWeatherData[0].state}`);

    // Expect that the weather data is displayed correctly after loading
    expect(cityElement).toBeInTheDocument();
    expect(screen.getByText(/Clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/High: 80°F/i)).toBeInTheDocument();
    expect(screen.getByText(/Low: 68°F/i)).toBeInTheDocument();
    // Add more assertions for other data points if needed
  });

  it("should display an error message if weather data cannot be fetched", async () => {
    const mockPostcode = 98032;

    // Mock Axios to reject the promise (simulate an error during the fetch)
    axios.get.mockRejectedValue(new Error("Weather data fetch failed."));

    render(<Weather postcode={mockPostcode} />);

    // Wait for the weather data to load asynchronously
    const errorMessage = await screen.findByText("Error: Weather data fetch failed.");

    // Expect that the error message is displayed when data fetching fails
    expect(errorMessage).toBeInTheDocument();
  });
});