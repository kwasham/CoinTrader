import React, { useEffect, useState } from 'react';

const CoinbasePage = () => {
  const [data, setData] = useState(null);
  const [order, setOrder] = useState(null);
  const [ticker, setTicker] = useState(null);

  useEffect(() => {
    const fetchCoinbaseAccounts = async () => {
      try {
        const response = await fetch('/api/coinbase');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoinbaseAccounts();
  }, []);

  const handleClick = async (ticker) => {
    try {
      // add type=orders to the fetch url

      const response = await fetch(`/api/coinbase?type=ticker&ticker=${ticker}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('quote_increment: ', result.quote_increment);
      setTicker(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //   const handleOrder = async () => {
  //     try {
  //       const orderData = {
  //         // Provide the required data for creating the order
  //         product_id: 'XLM-USD',
  //         side: 'buy',
  //         quote_size: '2', // Replace with the desired quote size
  //         base_size: '0.01', // Replace with the desired base size
  //         // Add other required parameters as needed
  //       };

  //       const requestOptions = {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(orderData),
  //       };

  //       const response = await fetch(`/api/coinbaseCreateOrder`, requestOptions);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const result = await response.json();
  //       console.log('result: ', result)
  //       setOrder(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  const handleOrder = async () => {
    try {
      console.log('ticker: ', ticker);
      // Fetch the account details to get the available balance for the base currency (e.g., BTC)
      const response = await fetch('/api/coinbase');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const xlmAccount = data.accounts.find((account) => account.currency === 'XLM');
      console.log('xlmAccount: ', xlmAccount);
      const usdtAccount = data.accounts.find((account) => account.currency === 'USDT');
      if (!xlmAccount) {
        throw new Error('BTC account not found');
      }
      const baseSize = xlmAccount.available_balance.value;

      const quoteSize = usdtAccount.available_balance.value;
      //const formattedSize = (Math.floor(baseSize / baseIncrement) * baseIncrement).toFixed(8);

      // Create the order to sell 100% of the base size (BTC)
      const orderConfig = {
        ticker: 'XLMUSDT', // Replace with your desired product_id
        order: 'sell',
        test: 'true', // Set to "true" to test the order request without sending it to the exchange
        baseAccountBalance: baseSize,
        quoteAccountBalance: quoteSize,
        baseIncrement: ticker.base_increment,
        quoteIncrement: ticker.quote_increment,
      };

      // Send the order request to Coinbase API
      const orderResponse = await fetch('/api/coinbaseCreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderConfig),
      });
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      const orderResult = await orderResponse.json();
      setOrder(orderResult);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOrder2 = async () => {
    // Call the remote order endpoint
    const response = await fetch('/api/remoteOrder');
    const result = await response.json();
    console.log('result: ', result);
  };

  return (
    <div>
      <h1>Coinbase API Example</h1>
      {data ? (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          {Array.isArray(data.accounts) &&
            data.accounts.map((account, index) => (
              <button
                key={account.uuid}
                onClick={() => handleOrder()}
              >
                View Order: {account.uuid}
              </button>
            ))}
        </>
      ) : (
        <p>Loading data...</p>
      )}

      {order ? (
        <div>
          <h2>Order Details</h2>
          <pre>{JSON.stringify(order, null, 2)}</pre>
          {/* Add other properties you want to display */}
        </div>
      ) : (
        <p>Loading order data...</p>
      )}

      {ticker ? (
        <div>
          <h1>Product</h1>
          <pre>{JSON.stringify(ticker, null, 2)}</pre>
        </div>
      ) : (
        <p>Get Ticker Data</p>,
        <button onClick={() => handleClick('XLM-USDT')}>Get Ticker Data</button>,
        <button onClick={() => handleOrder2()}>Remote Order</button>
      )}
    </div>
  );
};

export default CoinbasePage;
