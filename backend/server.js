const express = require('express');
const cors = require('cors');
const router = require('./routes/routeTest');
const native = require('../indexer/index')

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

// Middleware example
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.get('/napi', (req, res) => {
  res.send(`Sum from napi! : ${native.sum(10, 10)}`);
});

// API endpoint to handle client requests
app.get('/api/messages', (req, res) => {
  res.json({ message: 'Sample message from the server-side.' });
});

app.use('/router', router);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = server;