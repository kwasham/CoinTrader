// here is the API key for coinmarketcap:  b5cf63d7-7f9e-4cda-8765-76755ec29679

import axios from "axios";

const apiKey = process.env.CMC_API_KEY;
const coinDataUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info`;
const topTenUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
const quotesUrl = `https://pro-api.coinmarketcap.com/v3/cryptocurrency/quotes/historical`;

export default async function handler(req, res) {
  try {
    
    const [topTenCoins, coinIds] = await getTopTenCoins();
    // Call the getCoinData function with the coin IDs
    const coinData = await getCoinData(coinIds);
    // Call the getCoinQuotes function with the coin IDs
    //const coinQuotes = await getCoinQuotes(coinIds);

    // Amend the topTenData with the logo URL from the coinData
    const mergedData = topTenCoins.map((coin) => {
      const coinDetails = coinData.data[coin.id];
      //const quotes = coinQuotes.data[coin.id];

      return {
        ...coin,
        logoUrl: coinDetails?.logo || "", // Assign the logo URL from coinData, or an empty string if not available
        //Assign the quote data from coinQuotes, or an empty object if not available
        //coinQuotes: quotes?.quotes || {},
      };
    });

    // Use the mergedData object as needed in your application
    //console.log("Here is the merged data", mergedData);
    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error combining API requests:", error);
  }
}

async function getCoinData(coinIds) {
  try {
    // Make API call to retrieve the coin data for the specified coin IDs
    const response = await axios.get(coinDataUrl, {
      params: {
        id: coinIds.join(","),
        CMC_PRO_API_KEY: apiKey,
      },
    });
    // Process the response and return the coin data
    const coinData = response.data;

    return coinData;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw error;
  }
}

async function getTopTenCoins() {
  try {
    const response = await axios.get(topTenUrl, {
      params: {
        limit: 100,
        sort: "market_cap",
        CMC_PRO_API_KEY: apiKey,
      },
    });
    const topTenData = response.data.data;
    // Extract the IDs of each coin
    const coinIds = topTenData.map((coin) => coin.id);
    return [response.data.data, coinIds];
  } catch (error) {
    console.error("Error fetching top ten coins:", error);
    throw error;
  }
}

async function getCoinQuotes(coinIds) {
  const end = Math.floor(Date.now() / 1000); // Current timestamp
  const start = end - 7 * 24 * 60 * 60; // Subtract number of days

  try {
    const response = await axios.get(quotesUrl, {
      params: {
        id: coinIds.join(","),
        CMC_PRO_API_KEY: apiKey,
        
        interval: "daily",
        time_start: start,
        time_end: end,
      },
    });
    const coinData = response.data;
    return coinData;
  } catch (error) {
    console.error("Error fetching coin quotes:", error);
    throw error;
  }
}
