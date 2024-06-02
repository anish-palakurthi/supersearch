import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const SpotlightSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    try {
      const response = await axios.get(`http://localhost:3001/search?q=${searchQuery}`);
      setResults(response.data); // Assuming the response is a list of strings
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="spotlight-container fixed top-0 left-0 w-full h-full bg-black rounded-lg shadow-lg" style={{ color: 'white' }}>
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default SpotlightSearch;
