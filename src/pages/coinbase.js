import React, { useEffect, useState } from 'react';

const CoinbasePage = () => {
  const [data, setData] = useState(null);
  const [order, setOrder] = useState(null);

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

  const handleClick = async (accountUUID) => {
    try {
      const response = await fetch(`/api/coinbase?account_uuid=${accountUUID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   const handleOrder = async () => {
//     try {
//       const orderData = {
//         // Provide the required data for creating the order
//         product_id: 'BTC-USD',
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

    const baseIncrement = "0.00000001";

    try {
      // Fetch the account details to get the available balance for the base currency (e.g., BTC)
      const response = await fetch('/api/coinbase');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const btcAccount = data.accounts.find((account) => account.currency === 'BTC');
      if (!btcAccount) {
        throw new Error('BTC account not found');
      }
      const baseSize = btcAccount.available_balance.value;
      const formattedSize = (Math.floor(baseSize / baseIncrement) * baseIncrement).toFixed(8);
  
      // Create the order to sell 100% of the base size (BTC)
      const orderConfig = {
        client_order_id: '654735684568',
        product_id: 'BTC-USD', // Replace with your desired product_id
        side: 'SELL',
        order_configuration: {
            market_market_ioc: {
            base_size: formattedSize, // Set the base_size to the available balance
          },
        },
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
  
  

  return (
    <div>
      <h1>Coinbase API Example</h1>
      {data ? (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          {Array.isArray(data.accounts) &&
            data.accounts.map((account, index) => (
              <button key={account.uuid} 
              onClick={() => handleOrder()}>
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
    </div>
  );
};

export default CoinbasePage;
