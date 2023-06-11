import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowsExchange } from "react-icons/tb";
import { GrLinkPrevious } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import "../converter.css";
import axios from "axios";

const CryptoConverter = () => {
  const [data, setData] = useState(null);

  const [convertValue, setConvertValue] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const [amount, setAmount] = useState(1);
  const [selectedValueFrom, setSelectedValueFrom] = useState("BTC");
  const [selectedValueTo, setSelectedValueTo] = useState("ETH");

  //get the lis of crypto and store their symbols in the select dropdown
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${url}`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
        },
        params: {
          limit: "20",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        convertCoin();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  // console.log(data);

  const rederedItems =
    data &&
    data.map((item) => {
      return (
        <>
          <option key={item.id} value={item.symbol}>
            {item.name} ({item.symbol})
          </option>
        </>
      );
    });

  const convertUrl =
    "https://pro-api.coinmarketcap.com/v2/tools/price-conversion";

  //logic to handle conversion
  const convertCoin = (e) => {
    e?.preventDefault();
    // console.log(selectedValueFrom, selectedValueTo, amount)
    setIsConverting(true);

    axios
      .get(`http://localhost:8080/${convertUrl}`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
        },
        params: {
          amount: amount,
          symbol: selectedValueFrom,
          convert: selectedValueTo,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsConverting(false);
        const convertedPrice =
          res.data.data[0]?.quote[selectedValueTo].price.toFixed(5);
        console.log(convertedPrice);
        setConvertValue(convertedPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSelectFromChange = (e) => {
    setSelectedValueFrom(e.target.value);
  };

  const handleSelectToChange = (e) => {
    setSelectedValueTo(e.target.value);
  };

  return (
    <div className="converter-wrapper">
      <h2>
        Cryptocurrency <span className="app-word">Converter</span>
      </h2>
      <form onSubmit={convertCoin} className="converter">
        <div>
          <label htmlFor="amountInput">Enter amount</label>
          <input
            id="amountInput"
            type="number"
            onChange={handleAmountChange}
            value={amount}
          />
        </div>
        <div className="drop-list">
          <div className="select-box">
            <label htmlFor="fromInput" className="from">From</label>

            <select id="fromInput" value={selectedValueFrom} onChange={handleSelectFromChange}>
              {rederedItems}
            </select>
          </div>
          <div className="convert-icon">
            <TbArrowsExchange size={32} />
          </div>
          <div className="select-box">
            <label htmlFor="toInput" className="to">To</label>

            <select id="toInput" value={selectedValueTo} onChange={handleSelectToChange}>
              {rederedItems}
            </select>
          </div>
        </div>

        <div className="exchange-rate">
          <p>
            {amount} {selectedValueFrom}
          </p>{" "}
          <span className="equal-sign">=</span>{" "}
          {isConverting ? (
            <ImSpinner9 className="rotation-icon" data-testid="spinner" />
          ) : (
            <strong>
              {convertValue} {selectedValueTo}
            </strong>
          )}
        </div>
        <button disabled={isConverting}>Convert</button>
      </form>
      <Link className="go-home" to="/">
        <GrLinkPrevious />
        <p>Go back home</p>
      </Link>
    </div>
  );
};

export default CryptoConverter;
