const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  screen,
} = require("electron");
const path = require("path");
const WebSocket = require('ws');

// Start Express server
require('../../backend/server');

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 360,
    height: 500,
    x: 0,
    y: height - 500, // Adjusted to be at the bottom but visible
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false, // This is necessary to use `require` in the renderer process
    },
  });
  win.setResizable(false);

  win.loadURL("http://localhost:3000"); // Next.js frontend

  // WebSocket communication
  const ws = new WebSocket('ws://localhost:3001');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
    ws.send('Hello from Electron client');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.message);
    win.webContents.send('ws-message', data.message); // Send the message to the renderer process
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

app.on("ready", async () => {
  createWindow();
  isWindowOpen = true;
});

app.on("ready", () => {
  globalShortcut.register("Alt+X", () => {
    if (isWindowOpen) {
      BrowserWindow.getFocusedWindow().close();
      isWindowOpen = false;
    } else {
      createWindow();
      isWindowOpen = true;
    }
  });
});

app.on("window-all-closed", () => {
  if (process?.platform !== "darwin") {
    // app.quit();
  }
});
