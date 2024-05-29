// frontend/main/main.js
const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  screen,
} = require("electron");
const serve = require("electron-serve");
var os = require("os");
const path = require("path");
const { desktopCapturer } = require('electron');
const screenshot = require('screenshot-desktop');

// Start Express server
require('../../backend/server');

async function captureScreen() {
  try {
    const imgPath = path.join(os.tmpdir(), 'screenshot.png'); // Save in the OS's temporary directory
    await screenshot({filename: imgPath});
    return imgPath; // Return the file path
  } catch (error) {
    console.error("Error capturing the screen: ", error);
    return null;
  }
}

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

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
    },
  });
  win.setResizable(false);

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000"); // Electron frontend
    //win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
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
