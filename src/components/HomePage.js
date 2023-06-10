import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "../home.css";
import axios from "axios";

const HomePage = () => {

  // data state variable to hold the list of crypto, their price and rise/fall
  const [data, setData] = useState(null);
  const [logos, setLogos] = useState({});

  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${url}`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
        },
        params: {
          limit: 50,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // endpoint to get icons
  const iconsUrl = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info";

  // function to get url
  const getUrl = (ids) => {
    axios
      .get(`http://localhost:8080/${iconsUrl}`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
        },
        params: {
          id: ids,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        const logoData = response.data.data;

        //logoUrls to hold the list of logos and their ids in key value pairs
        const logoUrls = {};
        for (let item in logoData) {
          logoUrls[item] = logoData[item].logo;
          // console.log(item.logo)
        }
        console.log(logoUrls);
        setLogos(logoUrls);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(data);
  //get the list of crypto id from the data state
  const allLogoId = data && data.map(({ id }) => id).join(",");
  
  getUrl(allLogoId);

  //render a list of all the cryptos
  const renderedData =
    data &&
    data.map((item) => {
      // console.log(item.quote.USD.percent_change_7d);
      const price = item.quote.USD.price.toFixed(2);
      const lastTwentyFourHours = item.quote.USD.percent_change_24h.toFixed(3);
      const lastSevenDays = item.quote.USD.percent_change_7d.toFixed(3);

      const priceDroppedTwentyFourHours = lastTwentyFourHours < 0;
      const priceDroppedSevenDays = lastSevenDays < 0;

      return (
        <>
          <section key={item.id} className="crypto-wrapper">
            <div>
              <div className="icon-div">
                <img src={logos[item.id]} className="logo" />
                <p>{item.symbol}</p>
              </div>
            </div>

            <div><p>${price}</p></div>
            {/* logic to check if price rise/fall */}
            <div className="rise-fall-wrapper">
              {priceDroppedTwentyFourHours ? (
                <AiFillCaretDown className="price-fall"/>
              ) : (
                <AiFillCaretUp className="price-rise"/>
              )}
              <p
                className={
                  priceDroppedTwentyFourHours ? "price-fall" : "price-rise"
                }
              >
                {lastTwentyFourHours}
                <span>%</span>
              </p>
            </div>
            <div className="rise-fall-wrapper">
              {priceDroppedSevenDays ? <AiFillCaretDown className="price-fall"/> : <AiFillCaretUp className="price-rise"/>}
              
              <p className={priceDroppedSevenDays ? "price-fall" : "price-rise"}>
                {lastSevenDays}
                <span>%</span>
              </p>
            </div>
          </section>
          
            <hr />
        </>
      );
    });

  return (
    <div className="home-page">
      <div>
        <div className="home-left">
        <div className="app-header">
          <h2>
            Crypto <span className="app-word">App</span>
          </h2>

          <Link to="/converter"><button>Convert Coin</button></Link>
          </div>

          <p>
            See all available Cryto currencies, their rise/fall, and their
            current rate
          </p>
        </div>

        <div className="home-right">
          <section>
            <div className="crypto-header">
              
                <h4>Name</h4>
                <h4>Price</h4>
                <h4>24h %</h4>
                <h4>7 days %</h4>
            </div>
            <>{renderedData}</>
          </section>
        </div>
      </div>
    
    </div>
  );
};

export default HomePage;
