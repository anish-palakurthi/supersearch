const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Dummy search function
function performSearch(query) {
  // Implement your search logic here
  return [`Result 1 for ${query}`, `Result 2 for ${query}`];
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('index.html');

  ipcMain.on('search-query', (event, query) => {
    const results = performSearch(query);
    mainWindow.webContents.send('search-results', results);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
