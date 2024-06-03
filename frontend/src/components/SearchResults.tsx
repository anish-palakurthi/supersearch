import type { FC } from 'react';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="search-results-container max-h-64 overflow-y-auto">
      <ul className="w-full">
        {results.map((result, index) => (
          <li key={result} className="border-b" style={{ borderColor: 'rgba(128, 128, 128, 0.35)' }}>
          <SearchResultItem result={result} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;