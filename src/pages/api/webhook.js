// pages/api/webhook.js
// pages/api/webhook.js
const handleCreateOrder = async (tradeData) => {
  try {
    const response = await fetch(`https://416e-24-27-36-117.ngrok-free.app/api/coinbaseCreateOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tradeData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Create Order Response:', result);
  } catch (error) {
    console.error('Error creating order from webhook file:', error);
  }
};

const getListAccounts = async (base, quote) => {
  try {
    console.log('base: ', base);
    // Fetch the account details to get the available balance for the base currency (e.g., BTC)
    const response = await fetch('https://416e-24-27-36-117.ngrok-free.app/api/coinbase');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('data: ', data);
    const base_account = data.accounts.find((account) => account.currency === base);
    console.log('base_account: ', base_account);
    const quote_account = data.accounts.find((account) => account.currency === quote);
    console.log('quote_account: ', quote_account);
    if (!base_account) {
      throw new Error('base account not found');
    }
    const base_amount = base_account.available_balance.value

    const quote_amount = quote_account.available_balance.value
    //const formattedSize = (Math.floor(baseSize / baseIncrement) * baseIncrement).toFixed(8);

    // Create the order to sell 100% of the base size (BTC)
    return {base_amount, quote_amount}
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const getAccountBalance = async (accountUUID) => {
  try {
    const response = await fetch(`https://416e-24-27-36-117.ngrok-free.app/api/coinbase?account_uuid=${accountUUID}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Await the response
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const getProduct = async (ticker) => {
  try {
    const response = await fetch(`https://416e-24-27-36-117.ngrok-free.app/api/coinbase?ticker=${ticker}&type=ticker`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Await the response
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default async function handler(req, res) { // Make the handler function async
  if (req.method === 'POST') {
    // Process the incoming webhook data here
    const tradeData = req.body;
    const base_symbol = tradeData.ticker.slice(0, -4); // "BTC"
    const quote_symbol = tradeData.ticker.slice(-4); // "USDT"
    const ticker = tradeData.ticker.replace('USDT', '-USDT')
    // Log the received webhook data (for demonstration purposes)
    console.log('Received tradeData:', tradeData);
    
    const {base_amount, quote_amount} = await getListAccounts(base_symbol, quote_symbol);
    const product = await getProduct(ticker);
    const baseIncrement = product.base_increment;
    const quoteIncrement = product.quote_increment;
    
    // const baseAccountBalance = await getAccountBalance(base_amount); // Await the function call
    // const quoteAccountBalance = await getAccountBalance(quote_account); // Await the function call
    
    // console.log('baseAccountBalance:', baseAccountBalance);
    // console.log('quoteAccountBalance:', quoteAccountBalance);
    // Add the balances to the tradeData object
    tradeData.baseAccountBalance = base_amount;
    tradeData.quoteAccountBalance = quote_amount;
    tradeData.quoteIncrement = quoteIncrement;
    tradeData.baseIncrement = baseIncrement;
    

    // TODO: Implement your webhook handling logic
    // You can further process the webhookData here, e.g., store it in a database, trigger some actions, etc.

    // Create an order based on the received trade data
    if (tradeData.position !== "0") {
      await handleCreateOrder(tradeData); // Await the function call

    }
    

    // Send a response back to the webhook provider
    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    // Handle other HTTP methods if needed
    res.status(405).end(); // Method Not Allowed
  }
}
  
  