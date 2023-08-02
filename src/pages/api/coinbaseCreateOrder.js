import { v4 as uuidv4 } from 'uuid';
import generateSignature from '../../api/auth/coinbaseAuth'; // Update the path to the utility file

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;
const baseUrl = 'https://api.coinbase.com';

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed fool' });
      }
  if (req.method === 'POST') {
    console.log('request body: ', req.body)
    try {
      const ticker = req.body.ticker.replace('USDT', '-USDT')

      const clientOrderId = uuidv4();; // Replace with your unique client order ID
      const product_id = ticker; // Replace with the product ID for the asset-pair (e.g., 'BTC-USD')
    //   const side = req.body.order.action.toUpperCase(); // Replace with 'BUY' or 'SELL' depending on the order side
        const side = req.body.order.toUpperCase(); // Replace with 'BUY' or 'SELL' depending on the order side
        const quoteAccountBalance = Number(req.body.quoteAccountBalance);
        const baseAccountBalance = Number(req.body.baseAccountBalance);
        const quoteDecimalPlaces = req.body.quoteIncrement.split('.')[1].length;
        const baseDecimalPlaces = req.body.baseIncrement.split('.')[1].length;
        const quote_size = (quoteAccountBalance * 0.99).toFixed(quoteDecimalPlaces);
        const base_size = (baseAccountBalance * 0.99).toFixed(baseDecimalPlaces);
        console.log("quoteAccountBalance", quoteAccountBalance, "baseAccountBalance", baseAccountBalance, "quoteDecimalPlaces", quoteDecimalPlaces, "baseDecimalPlaces", baseDecimalPlaces, "quote_size", quote_size, "base_size", base_size)

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const requestPath = '/api/v3/brokerage/orders';
      const method = req.method;

      const bodyParams = {
        client_order_id: clientOrderId,
        product_id,
        side,
        order_configuration: {
          market_market_ioc: {
            quote_size: side === 'BUY' ? quote_size : undefined,
            base_size: side === 'SELL' ? base_size : undefined,
          },
        },
      };

      const body = JSON.stringify(bodyParams);
      console.log('body: ', body)   

      const signature = generateSignature(timestamp, method, requestPath, body, apiSecret);

      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'CB-ACCESS-KEY': apiKey,
          'CB-ACCESS-TIMESTAMP': timestamp,
          'CB-ACCESS-SIGN': signature,
        },
        body,
      };
       

      const response = await fetch(`${baseUrl}${requestPath}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok from create order file');
      }

      const result = await response.json();
        console.log('result: ', result)
      res.status(200).json(result);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
