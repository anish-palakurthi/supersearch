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
    <div className="spotlight-container fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-lg bg-white rounded-lg shadow-lg">
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default SpotlightSearch;
