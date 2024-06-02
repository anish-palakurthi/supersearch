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
      value={input}
      onChange={handleChange}
      className="w-full h-full p-4 border-b border-gray-300 focus:outline-none"
      placeholder="Search..."
    />
  );
};

export default SearchInput;