import { useEffect, useState } from 'react';
import SpotlightSearch from '@/components/SpotlightSearch';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/napi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        setMessage(data.message);
      })
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      
      <div className="w-full p-4">
        <SpotlightSearch />
      </div>
    </div>
  );
};

export default Home;