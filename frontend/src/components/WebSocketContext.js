import React, { createContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (window.electron) {
      window.electron.onWebSocketMessage((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, []);

  return (
    <WebSocketContext.Provider value={messages}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
