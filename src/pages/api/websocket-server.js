require('dotenv').config();


const WebSocket = require('ws');
const CryptoJS = require('crypto-js');
const fs = require('fs');

// Derived from your Coinbase Retail API Key
const SIGNING_KEY = process.env.COINBASE_API_SECRET;
const API_KEY = process.env.COINBASE_API_KEY;

if (!SIGNING_KEY.length || !API_KEY.length) {
  throw new Error('missing mandatory environment variable(s)');
}

const CHANNEL_NAMES = {
  heartbeat: 'heartbeats',
  level2: 'level2',
  user: 'user',
  tickers: 'ticker',
  ticker_batch: 'ticker_batch',
  status: 'status',
  market_trades: 'market_trades',
  candles: 'candles',
};

const WS_API_URL = 'wss://advanced-trade-ws.coinbase.com';

function sign(str, secret) {
  const hash = CryptoJS.HmacSHA256(str, secret);
  return hash.toString();
}

function timestampAndSign(message, channel, products = []) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const strToSign = `${timestamp}${channel}${products.join(',')}`;
  const sig = sign(strToSign, SIGNING_KEY);
  return { ...message, signature: sig, timestamp: timestamp };
}

const ws = new WebSocket(WS_API_URL);

function subscribeToProducts(products, channelName, ws) {
  const message = {
    type: 'subscribe',
    channel: channelName,
    api_key: API_KEY,
    product_ids: products,
  };
  const subscribeMsg = timestampAndSign(message, channelName, products);
  ws.send(JSON.stringify(subscribeMsg));
}

function unsubscribeToProducts(products, channelName, ws) {
  const message = {
    type: 'unsubscribe',
    channel: channelName,
    api_key: API_KEY,
    product_ids: products,
  };
  const subscribeMsg = timestampAndSign(message, channelName, products);
  ws.send(JSON.stringify(subscribeMsg));
}

ws.on('message', function (data) {
  
  const parsedData = JSON.parse(data);
  console.log('parsedData:', JSON.stringify(parsedData, null, 2));
  fs.appendFile('Output1.txt', data, (err) => {
    if (err) throw err;
  });
});

ws.on('open', function () {
  console.log('WebSocket connection opened');
  const products = ['BTC-USDT'];
  subscribeToProducts(products, CHANNEL_NAMES.heartbeat, ws);
  subscribeToProducts(products, CHANNEL_NAMES.user, ws);
  //subscribeToProducts(products, CHANNEL_NAMES.market_trades, ws);
  // subscribeToProducts(products, CHANNEL_NAMES.candles, ws);
  subscribeToProducts(products, CHANNEL_NAMES.level2, ws);
  // subscribeToProducts(products, CHANNEL_NAMES.tickers, ws);
});

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (client) => {
  console.log('New client connected');

  ws.on('message', function (data) {
    client.send(data);
  });

  client.on('close', () => {
    console.log('Client disconnected');
  });
});
