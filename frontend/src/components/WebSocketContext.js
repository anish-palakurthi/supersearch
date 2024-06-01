// components/WebSocketContext.tsx
import React, { createContext, useEffect, useState } from 'react';

const WebSocketContext = createContext([]);

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // Update the URL if needed

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.log('Received WebSocket message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={messages}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
