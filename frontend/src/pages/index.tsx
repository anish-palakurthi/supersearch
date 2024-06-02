import { useEffect, useState } from 'react';
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
    <div className="min-h-screen h-full bg-gray-900 flex flex-col justify-center items-center">
      <SpotlightSearch className="w-full h-full" />
      <h1 className="text-4xl font-bold text-white mt-8">{message}</h1>
    </div>
  );
};
export default Home;