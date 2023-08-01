
import generateSignature from '../../api/auth/coinbaseAuth'; // Update the path to the utility file

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;
const baseUrl = 'https://api.coinbase.com';

export default async function handler(req, res) {
  try {
    const { account_uuid } = req.query;

    if (account_uuid) {
      // If an account_uuid is provided, get account details using the UUID
      const accountDetails = await getAccount(account_uuid);
      const accountBalance = accountDetails.account.available_balance.value
      console.log('accountBalance: ', accountBalance)
      res.status(200).json(accountBalance);
    } else {
      // If no account_uuid is provided, list all accounts
      const accountsList = await listAccounts();
      res.status(200).json(accountsList);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}

async function getAccount(accountUUID) {
    try {
      const requestPath = `/api/v3/brokerage/accounts/${accountUUID}`;
      const method = 'GET';
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const body = '';
  
      const signature = generateSignature(timestamp, method, requestPath, body, apiSecret);
  
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'CB-ACCESS-KEY': apiKey,
          'CB-ACCESS-TIMESTAMP': timestamp,
          'CB-ACCESS-SIGN': signature,
        },
        redirect: 'follow',
      };
  
      const response = await fetch(`${baseUrl}${requestPath}`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

async function listAccounts() {
    try {
        const requestPath = '/api/v3/brokerage/accounts';
        const method = 'GET';
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const body = '';
    
        const signature = generateSignature(timestamp, method, requestPath, body, apiSecret);
    
        const requestOptions = {
          method,
          headers: {
            'Content-Type': 'application/json',
            'CB-ACCESS-KEY': apiKey,
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-SIGN': signature,
          },
          redirect: 'follow',
        };
    
        const response = await fetch(`${baseUrl}${requestPath}`, requestOptions);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    
