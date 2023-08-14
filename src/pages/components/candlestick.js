import useWebSocket from 'react-use-websocket';
import { useEffect } from 'react';

function CandlestickChart() {
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket('ws://localhost:12345');

  // Log WebSocket state
  useEffect(() => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        console.log('Connecting...');
        break;
      case WebSocket.OPEN:
        console.log('Connected.');
        sendMessage('NEXT_JS_CLIENT');
        break;
      case WebSocket.CLOSING:
        console.log('Closing...');
        break;
      case WebSocket.CLOSED:
        console.log('Closed.');
        break;
      default:
        console.log('Unknown WebSocket state:', readyState);
    }
  }, [readyState]);

  // Handle the incoming candle data
  useEffect(() => {
    if (lastMessage) {
      try {
        
        const data = JSON.parse(lastMessage.data);
        
        console.log('Received data:', data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  return (
    <div>
      {/* Your ApexCharts component here */}
    </div>
  );
}

export default CandlestickChart;
