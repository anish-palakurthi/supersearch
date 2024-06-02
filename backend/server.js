const express = require('express');
const cors = require('cors');
const router = require('./routes/routeTest');
const native = require('../indexer/index');
const { exec } = require('node:child_process');
const path = require('node:path'); // Add this line at the top of your file


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
  res.json({ message: `Sum from napi! : ${native.sum(10, 10)}` });
});

// API endpoint to handle client requests
app.get('/api/messages', (req, res) => {
  res.json(native.sum(10, 10));
});

// New search route
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;

  const dummyFilePaths = [
    '/Users/anishpalakurthi/supersearch/README.md',
    '/Users/anishpalakurthi/supersearch/testFile.txt',

  ];

  res.json(dummyFilePaths);
  // Mock data for demonstration purposes
  // res.json(native.generateList(searchQuery));
});


app.get('/open-file', (req, res) => {
  const filePath = req.query.filePath;

  // Ensure the filePath is an absolute path
  if (!path.isAbsolute(filePath)) {
    return res.status(400).send('Invalid file path');
  }

  const appleScriptPath = path.resolve(__dirname, 'openFile.scpt');
  const appleScriptCommand = `
    osascript ${appleScriptPath} "${filePath}"
  `;

  exec(appleScriptCommand, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error opening file');
    }
    res.send('File opened successfully');
  });
});


app.use('/router', router);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = server;