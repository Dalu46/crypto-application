import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import HomePage from "../components/HomePage";

jest.mock("axios");

describe("HomePage", () => {
  it("fetches data successfully", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          symbol: "BTC",
          name: "Bitcoin",
        },
        {
          id: 2,
          symbol: "ETH",
          name: "Ethereum",
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { getByText } = render(
      <Router>
        <HomePage />
      </Router>
    );

  });
});