import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowsExchange } from "react-icons/tb";
import { GrLinkPrevious } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { GetData } from "../utils/request";
import "../converter.css";

const CryptoConverter = () => {
  const [data, setData] = useState(null);

  const [convertValue, setConvertValue] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const [amount, setAmount] = useState(1);
  const [selectedValueFrom, setSelectedValueFrom] = useState("BTC");
  const [selectedValueTo, setSelectedValueTo] = useState("ETH");

 
  const dataParams = {
    limit: "20",
  };

  useEffect(() => {
    GetData("v1/cryptocurrency/listings/latest", dataParams)
      .then((res) => {
        setData(res.data.data);
        convertCoin();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  //logic to handle conversion
  const convertCoin = (e) => {
    e?.preventDefault();
    const convertParams = {
      amount: amount,
      symbol: selectedValueFrom,
      convert: selectedValueTo,
    };
    setIsConverting(true);

    GetData("v2/tools/price-conversion", convertParams)
      .then((res) => {
        setIsConverting(false);
        const convertedPrice =
          res.data.data[0]?.quote[selectedValueTo].price.toFixed(5);
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
            <label htmlFor="fromInput" className="from">
              From
            </label>

            <select
              id="fromInput"
              value={selectedValueFrom}
              onChange={handleSelectFromChange}
            >
              {rederedItems}
            </select>
          </div>
          <div className="convert-icon">
            <TbArrowsExchange size={32} />
          </div>
          <div className="select-box">
            <label htmlFor="toInput" className="to">
              To
            </label>

            <select
              id="toInput"
              value={selectedValueTo}
              onChange={handleSelectToChange}
            >
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
