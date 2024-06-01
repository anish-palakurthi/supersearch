import type React from 'react';
import { useContext } from 'react';
import SpotlightSearch from '../components/SpotlightSearch';
import WebSocketContext from '../components/WebSocketContext';
import MessageList from '../components/MessageList';

const Home: React.FC = () => {
  const messages: string[] = useContext(WebSocketContext);
  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col justify-center items-center">
      <SpotlightSearch />
      <div className="mt-4 w-full max-w-md bg-white p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-2">WebSocket Messages</h2>
        <MessageList />

      </div>
    </div>
  );
};

export default Home;
