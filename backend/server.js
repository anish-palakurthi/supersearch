// backend/server.js
const express = require('express');
const app = express();
const port = 3001;

// Middleware example
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
