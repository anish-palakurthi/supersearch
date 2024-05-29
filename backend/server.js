// backend/server.js
const express = require('express');
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
