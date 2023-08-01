import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function HomePage() {
    const [orderbook, setOrderBook] = useState({ bids: {}, asks: {} });


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        //console.log('message: ', message);
        if (message.type === 'heartbeat') {
          console.log('heartbeat');
        } else if (message.events[0].type === 'snapshot') {
          handleSnapshot(message);
        } else if (message.events[0].type === 'update') {
          handleUpdate(message);
        }
      };
      

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const handleSnapshot = (snapshot) => {
    const newOrderBook = { bids: {}, asks: {} };
    snapshot.events[0].updates.forEach((update) => {
      if (update.side === 'bid') {
        newOrderBook.bids[update.price_level] = update.new_quantity;
      } else {
        newOrderBook.asks[update.price_level] = update.new_quantity;
      }
    });
    setOrderBook(newOrderBook);
  };
  

  const handleUpdate = (message) => {
    setOrderBook((prevOrderBook) => {
      const newOrderBook = { ...prevOrderBook };
      message.events[0].updates.forEach((update) => {
        if (update.side === 'bid') {
          if (update.new_quantity === '0') {
            delete newOrderBook.bids[update.price_level];
          } else {
            newOrderBook.bids[update.price_level] = update.new_quantity;
          }
        } else {
          if (update.new_quantity === '0') {
            delete newOrderBook.asks[update.price_level];
          } else {
            newOrderBook.asks[update.price_level] = update.new_quantity;
          }
        }
      });
      return newOrderBook;
    });
  };
  
  

  if (!orderbook) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: 'side', headerName: 'Side', width: 130 },
    { field: 'price_level', headerName: 'Price', width: 130 },
    { field: 'new_quantity', headerName: 'Quantity', width: 130 },
  ];

  let bids = [];
  let asks = [];
  if (orderbook) {
    bids = Object.entries(orderbook.bids).map(([price_level, new_quantity]) => ({
      id: price_level,
      side: 'bid',
      price_level: Number(price_level),
      new_quantity: Number(new_quantity),
    }));
    asks = Object.entries(orderbook.asks).map(([price_level, new_quantity]) => ({
      id: price_level,
      side: 'ask',
      price_level: Number(price_level),
      new_quantity: Number(new_quantity),
    }));
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Asks</h2>
      <DataGrid
        rows={asks}
        columns={columns}
        pageSize={5}
        getCellClassName={(params) => {
          return params.value === 'ask' ? 'ask-cell' : '';
        }}
      />
      <h2>Bids</h2>
      <DataGrid
        rows={bids}
        columns={columns}
        pageSize={5}
        getCellClassName={(params) => {
          return params.value === 'bid' ? 'bid-cell' : '';
        }}
      />
      <style jsx 
      global>{`
        .ask-cell {
          color: red;
        }
        .bid-cell {
          color: green;
        }
      `}</style>
    </div>
  );
}
