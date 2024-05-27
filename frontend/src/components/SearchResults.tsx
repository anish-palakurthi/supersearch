// src/components/SearchResults.tsx
// src/components/SearchResults.tsx
import type { FC } from 'react';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <ul className="max-h-64 overflow-y-auto">
      {results.map((result) => (
        <SearchResultItem key={result} result={result} />
      ))}
    </ul>
  );
};

export default SearchResults;
