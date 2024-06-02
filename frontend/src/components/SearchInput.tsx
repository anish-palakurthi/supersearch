import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
          type="text"
          className="w-full p-3 rounded-md text-gray-300 bg-black bg-opacity-40 border-none focus:ring-2 focus:ring-blue-700 focus:outline-none"
          placeholder="Search..."
          onChange={handleChange}
        />
  );
};

export default SearchInput;