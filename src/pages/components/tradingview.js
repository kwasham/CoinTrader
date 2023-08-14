import { useEffect } from 'react';
import Box from '@mui/material/Box';

export default function TradingViewWidget({symbol}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'TradingView' in window) {
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol || "COINBASE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        watchlist: ["COINBASE:BTCUSDT"],
        details: true,
        hotlist: true,
        calendar: true,
        container_id: "tradingview_bd89c"
      });
    }
  }, []);

  return (
    <Box height="600px" 
    className='tradingview-widget-container'>
      <Box height='600px' 
      id='tradingview_bd89c' />
      <Box className="tradingview-widget-copyright" 
      component="div">
        <a href="https://www.tradingview.com/" 
        rel="noopener nofollow" 
        target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </Box>
    </Box>
  );
}
