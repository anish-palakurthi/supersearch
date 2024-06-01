const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  screen,
} = require("electron");
const path = require("node:path");

// Start Express server
const server = require('../../backend/server');

let isWindowOpen = false;

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
  win.setResizable(true);

  win.loadURL("http://localhost:3000") // Next.js frontend
    .then(() => {
      console.log('URL loaded successfully');
    })
    .catch((err) => {
      console.error('Failed to load URL:', err);
    });

  // Open the DevTools.
  win.webContents.openDevTools();

  win.on('closed', () => {
    isWindowOpen = false;
  });
};

app.on("ready", async () => {
  createWindow();
  isWindowOpen = true;

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
  if (process.platform !== "darwin") {
    app.quit();
  }
});