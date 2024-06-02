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
    width: 800,
    height: 400,
    x: (width - 800) / 2,
    y: (height - 400) / 2, // Set y position to height - window height for bottom
    frame: false,
    backgroundColor: '#000000', // Set background color to black

    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },

  });
  win.setResizable(false);

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    //win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
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