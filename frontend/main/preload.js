const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  onWebSocketMessage: (callback) => ipcRenderer.on('ws-message', (event, message) => callback(message)),

});

ipcRenderer.on('ws-message', (event, message) => {
  console.log('Message from WebSocket server:', message);
  // Handle the message as needed
});




/*Add something here??*/
