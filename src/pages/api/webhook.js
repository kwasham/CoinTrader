// pages/api/webhook.js
// pages/api/webhook.js
const handleCreateOrder = async (tradeData) => {
  try {
    const response = await fetch(`https://d8f7-24-27-36-117.ngrok-free.app/api/coinbaseCreateOrder`, {
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

const getAccountBalance = async (accountUUID) => {
  try {
    const response = await fetch(`https://d8f7-24-27-36-117.ngrok-free.app/api/coinbase?account_uuid=${accountUUID}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Await the response
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default async function handler(req, res) { // Make the handler function async
  if (req.method === 'POST') {
    // Process the incoming webhook data here
    const tradeData = req.body;

    // Log the received webhook data (for demonstration purposes)
    console.log('Received tradeData:', tradeData);

    const baseAccountBalance = await getAccountBalance("57a84a84-fa47-52d6-aab1-f3302e267d4b"); // Await the function call
    const quoteAccountBalance = await getAccountBalance("6d835375-4879-5576-81a8-408c607a7f97"); // Await the function call
    console.log('baseAccountBalance:', baseAccountBalance);
    console.log('quoteAccountBalance:', quoteAccountBalance);
    // Add the balances to the tradeData object
    tradeData.baseAccountBalance = baseAccountBalance;
    tradeData.quoteAccountBalance = quoteAccountBalance;

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
  
  