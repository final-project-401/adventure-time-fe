// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import axios from "axios";
// import Weather from "./index";
// jest.mock("axios");

// describe("Weather", () => {
//     const mockWeatherData = [
//       {
//         data: [
//           {
//             date: "2023-07-25",
//             weatherCode: 800,
//             icon: "clear",
//             temp: 75,
//             description: "Clear sky",
//             high_temp: 80,
//             low_temp: 68,
//             uvIndex: 5,
//             windDir: "SW",
//             windSpd: 10,
//             humidity: 65,
//             pressure: 1015,
//             pop: 0,
//           },
//           // Add more data for other forecast days if needed
//         ],
//         state: "Some State",
//       },
//     ];
//     // Mock the Axios get function to return the mockWeatherData
//     axios.get.mockResolvedValue({ data: mockWeatherData });

//   it("should render the weather card with correct data", async () => {
//     const mockPostcode = 98032;
//     // Mock Axios to resolve with the mockWeatherData
//     axios.get.mockResolvedValue({ data: mockWeatherData });
//     render(<Weather postcode={mockPostcode} />);
//     // Wait for the "Loading..." text to be removed when data is loaded
//     await waitFor(() => screen.findByText(`${date.dayOfWeek}, ${date.todayM} ${date.todayD}`));
//     // Continue with your assertions...
//   });

//   it("should display an error message if weather data cannot be fetched", async () => {
//     const mockPostcode = 98032;
//     // Mock Axios to reject the promise (simulate an error during the fetch)
//     axios.get.mockRejectedValue(new Error("Weather data fetch failed."));
//     render(<Weather postcode={mockPostcode} />);

//     // Wait for the error message to be displayed when data fetching fails
//     await waitFor(() => screen.findByText("Error: Weather data fetch failed."));

//     // Continue with your assertions...
//   });
// });
