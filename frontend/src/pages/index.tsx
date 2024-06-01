import  { useEffect, useState } from 'react';
import SpotlightSearch from '../components/SpotlightSearch';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);
  
  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col justify-center items-center">
      <SpotlightSearch />
      <div className="mt-4 w-full max-w-md bg-white p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-2">WebSocket Messages</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Home;