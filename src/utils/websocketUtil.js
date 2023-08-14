// websocketUtil.js

const WebSocket = require('ws');
const CryptoJS = require('crypto-js');

const WS_API_URL = 'wss://advanced-trade-ws.coinbase.com';
const SIGNING_KEY = process.env.COINBASE_API_SECRET;  // Get from your environment variables
const API_KEY = process.env.COINBASE_API_KEY;  // Get from your environment variables

console.log("signing key", SIGNING_KEY)

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

function subscribeToProducts(products, channelName, ws) {
    console.log('subscribing to products', products)
    const message = {
        type: 'subscribe',
        channel: channelName,
        api_key: API_KEY,
        product_ids: products,
    };
    const subscribeMsg = timestampAndSign(message, channelName, products);
    ws.send(JSON.stringify(subscribeMsg));
}

module.exports = {
    WS_API_URL,
    subscribeToProducts
};
