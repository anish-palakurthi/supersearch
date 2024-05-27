// src/components/SpotlightSearch.tsx

import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const SpotlightSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // Simulate search results
    setResults([
        `Result 1 for ${searchQuery}`,
        `Result 2 for ${searchQuery}`,
        `Result 3 for ${searchQuery}`,
      ]);
  };

  return (
    <div className="spotlight-container fixed top-0 left-0 w-full h-full bg-white rounded-lg shadow-lg">
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default SpotlightSearch;
