// import React from "react";
// import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";
// import CryptoConverter from "../components/CryptoConverter";

// jest.mock("axios");

// describe("CryptoConverter", () => {
//   it("fetches data successfully", async () => {
//     const mockData = {
//       data: [
//         {
//           id: 1,
//           symbol: "BTC",
//           name: "Bitcoin",
//         },
//         {
//           id: 2,
//           symbol: "ETH",
//           name: "Ethereum",
//         },
//       ],
//     };

//     axios.get.mockResolvedValueOnce({ data: mockData });

//     const { getByText } = render(
//       <Router>
//         <CryptoConverter />
//       </Router>
//     );

//   });
// });

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CryptoConverter from "../components/CryptoConverter";

jest.mock("axios");

describe("CryptoConverter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("performs conversion correctly", async () => {
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

    const mockConversionResult = {
      data: {
        data: [
          {
            quote: {
              USD: {
                price: 50000,
              },
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValueOnce({ data: mockData });
    axios.get.mockResolvedValueOnce({ data: mockConversionResult });

    const { getByLabelText, getByText } = render(<Router><CryptoConverter /></Router>);

    const amountInput = getByLabelText("Enter amount");
    const fromSelect = getByLabelText("From");
    const toSelect = getByLabelText("To");
    const convertButton = getByText("Convert");

    fireEvent.change(amountInput, { target: { value: "2" } });
    fireEvent.change(fromSelect, { target: { value: "BTC" } });
    fireEvent.change(toSelect, { target: { value: "ETH" } });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenNthCalledWith(
        1,
        "http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenNthCalledWith(
        2,
        "http://localhost:8080/https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
        expect.any(Object)
      );

     
    });
  });
});