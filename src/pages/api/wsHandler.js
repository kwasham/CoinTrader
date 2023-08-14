import { Server } from 'ws';
import { subscribeToProducts } from '../../utils/websocketUtil';

export default function handler(req, res) {
    console.log('* WebSocket route accessed');

    if (!res.socket.server.ws) {
        console.log('* Initializing WebSocket server');
        res.socket.server.ws = new Server({ noServer: true });
        
        res.socket.server.ws.on('connection', (socket) => {
            console.log('* Connected to WebSocket');
            socket.send(JSON.stringify({ type: 'test', message: 'Hello from server!' }));
            subscribeToProducts(['BTC-USD'], 'level2', socket);
            socket.on('message', (message) => {
                console.log(`Received message: ${message}`);
            });
        });
    }
    console.log('* Handling upgrade request');
    console.log('headers', req.headers)
    console.log('upgrade', req.headers.upgrade)
    //console.log('websocket', req.headers.upgrade.toLowerCase() === 'websocket')
    if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
        console.log('* Upgrading HTTP request to WebSocket');
        res.socket.server.ws.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            res.socket.server.ws.emit('connection', ws, req);
        });
    } else {
        res.status(400).send('Expected a WebSocket connection');
    }
}
