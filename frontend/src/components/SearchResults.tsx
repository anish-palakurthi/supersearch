import type { FC } from 'react';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="search-results-container max-h-64 overflow-y-auto">
      <ul className="w-full">
        {results.map((result) => (
          <SearchResultItem key={result} result={result} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;