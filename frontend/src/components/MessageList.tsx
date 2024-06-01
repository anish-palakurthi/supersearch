import React, { useContext } from 'react';
import WebSocketContext from './WebSocketContext';


interface Message {
  id: string;
  text: string;
}

const MessageList = () => {
  const messages: Message[] = useContext(WebSocketContext);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((message: Message) => (
          <li key={message.id} className="message-item">{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;