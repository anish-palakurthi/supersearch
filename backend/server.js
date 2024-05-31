const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3001; // Express server running on port 3001

// Middleware example
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

// API endpoint to handle client requests
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.send(JSON.stringify({ message: 'Hello from WebSocket server!' }));

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
