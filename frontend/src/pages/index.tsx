import { useEffect, useState } from 'react';
import SpotlightSearch from '@/components/SpotlightSearch';
const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full p-4">
        <SpotlightSearch />
        <h1 className="text-xl font-bold text-white mt-4 text-center">{message}</h1>
      </div>
    </div>
  );
};

export default Home;
