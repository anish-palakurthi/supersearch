import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import axios from 'axios';

const SpotlightSearch: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      setResults([]); // Clear results if the input is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/search?q=${searchQuery}`);
      setResults(response.data); // Assuming the response is a list of strings
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClear = () => {
    setResults([]); // Clear results when input is empty
  };

  return (
    <div className="spotlight-container fixed top-0 left-0 w-full h-full bg-black rounded-lg shadow-lg" style={{ color: 'white' }}>
      <SearchInput onSearch={handleSearch} onClear={handleClear} />
      <SearchResults results={results} />
    </div>
  );
};

export default SpotlightSearch;
