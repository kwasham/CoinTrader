import CryptoJS from 'crypto-js';

const generateSignature = (timestamp, method, requestPath, body, apiSecret) => {
  const payload = `${timestamp}${method}${requestPath}${body}`;
 
  return CryptoJS.HmacSHA256(payload, apiSecret).toString(CryptoJS.enc.Hex);
};

export default generateSignature;
