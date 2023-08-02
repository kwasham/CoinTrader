import generateSignature from '../../api/auth/coinbaseAuth';

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;
const baseUrl = 'https://api.coinbase.com';

const generateOptions = (method, requestPath, body = '') => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = generateSignature(timestamp, method, requestPath, body, apiSecret);

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'CB-ACCESS-KEY': apiKey,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-SIGN': signature,
    },
    redirect: 'follow',
  };
};

const fetchFromApi = async (requestPath, options) => {
  const response = await fetch(`${baseUrl}${requestPath}`, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export default async function handler(req, res) {
  const { account_uuid, type, ticker } = req.query;
  console.log('type: ', type, 'ticker: ', ticker, 'account_uuid: ', account_uuid)
  try {
    if (type === 'orders') {
      const ordersList = await fetchFromApi('/api/v3/brokerage/orders/historical/batch', generateOptions('GET', '/api/v3/brokerage/orders/historical/batch'));
      res.status(200).json(ordersList);
    } else if (account_uuid) {
      const accountDetails = await fetchFromApi(`/api/v3/brokerage/accounts/${account_uuid}`, generateOptions('GET', `/api/v3/brokerage/accounts/${account_uuid}`));
      res.status(200).json(accountDetails.account.available_balance.value);
    } else if(type === 'ticker'){
      const tickerData = await fetchFromApi(`/api/v3/brokerage/products/${ticker}`, generateOptions('GET', `/api/v3/brokerage/products/${ticker}`));
      res.status(200).json(tickerData);
    } else {
      const accountsList = await fetchFromApi('/api/v3/brokerage/accounts', generateOptions('GET', '/api/v3/brokerage/accounts'));
      res.status(200).json(accountsList);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}

