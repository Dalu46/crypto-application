import axios from "axios";

export const GetData = async (url, params) => {
  try {
    return axios.get(`http://localhost:8080/https://pro-api.coinmarketcap.com/${url}`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
      params: {
        ...params, // Merge the dynamic params with the existing params
      },
    });
  } catch (err) {
    console.log(err);
  }
};
