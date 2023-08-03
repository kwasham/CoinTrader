import generateSignature from '../api/auth/coinbaseAuth';


const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;
const baseUrl = 'https://api.coinbase.com';


async function fetchFromApi(method, endpoint, body = '') {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  
  const signature = generateSignature(timestamp, method, endpoint, body, apiSecret);
  

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'CB-ACCESS-KEY': apiKey,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-SIGN': signature,
    },
    //body: body ? JSON.stringify(body) : null,
    redirect: 'follow',
  };
  
  const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
 
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  
  return await response.json();
}

export async function listOrders() {
  return fetchFromApi('GET', '/api/v3/brokerage/orders/historical/batch');
}

export async function getAccount(accountUUID) {
  return fetchFromApi('GET', `/api/v3/brokerage/accounts/${accountUUID}`);
}

export async function listAccounts() {
  console.log('listAccounts')
  return fetchFromApi('GET', '/api/v3/brokerage/accounts');
}

export async function getTicker(ticker) {
  return fetchFromApi('GET', `/api/v3/brokerage/products/${ticker}`);
}
