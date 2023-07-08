const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 5500 }); // Replace with your desired port number

// Store connected clients
const clients = new Set();

// WebSocket server event listeners
wss.on('connection', (ws) => {
  console.log('A client connected');

  // Add client to the set
  clients.add(ws);

  // WebSocket message event listener
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all clients
    broadcastMessage(message);
  });
