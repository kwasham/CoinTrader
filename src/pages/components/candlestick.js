import useWebSocket from 'react-use-websocket';
import { Container } from '@mui/system';
import { Chart } from '../../components/chart';
import { useState, useEffect, useRef } from 'react';


function CandlestickChart() {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: 'pan'
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      zoom: {
        enabled: true,
        type: 'y',
        autoScaleXaxis: true,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#26A69A',
          downward: '#EF5350'
        }
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    grid: {
      borderColor: '#F8F8F8'
    },
    // ... other options
  };
  

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:12345');

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

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        handleNewData(data);
        console.log('Received data:', data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const chartElement = chartRef.current && chartRef.current.container;
  
    if (chartElement) {
      chartElement.addEventListener('wheel', handleWheel);
    }
  
    return () => {
      if (chartElement) {
        chartElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  

  function transformData(candles) {
    return candles.map((candle) => {
        // Convert the human-readable timestamp to a Date object
        const date = new Date(candle.start);
        // Convert the Date object to a Unix timestamp in milliseconds
        const timestamp = date.getTime();
        
        return [
            timestamp,
            parseFloat(candle.open),
            parseFloat(candle.high),
            parseFloat(candle.low),
            parseFloat(candle.close),
        ];
    });
}

function handleNewData(newData) {
  const transformedNewData = transformData(newData);

  if (newData.length === 100) {
    setChartData(transformedNewData);
  } else {
    if (chartRef.current) {
      const currentSeries = chartRef.current.props.series[0].data;
      const updatedSeries = [...currentSeries];
      updatedSeries[updatedSeries.length - 1] = transformedNewData[0];
      chartRef.current.updateSeries([{ data: updatedSeries }]);
    }
  }
}


const handleWheel = (event) => {
  event.preventDefault();

  const chart = chartRef.current && chartRef.current.chart;
  if (chart) {
    if (event.deltaY < 0) {
      chart.zoomX(
        chart.w.globals.minX - (chart.w.globals.rangeX * 0.1),
        chart.w.globals.maxX + (chart.w.globals.rangeX * 0.1)
      );
    } else {
      chart.zoomX(
        chart.w.globals.minX + (chart.w.globals.rangeX * 0.1),
        chart.w.globals.maxX - (chart.w.globals.rangeX * 0.1)
      );
    }
  }
};

  

  return (
    <Container maxWidth="lg">
    <div>
      {chartData && chartData.length > 0 && (
        <Chart
          ref={chartRef}
          options={options}
          series={[{ data: chartData }]}
          type="candlestick"
          height={450}
        />
      )}
    </div>
    </Container>
  );
}

export default CandlestickChart;
