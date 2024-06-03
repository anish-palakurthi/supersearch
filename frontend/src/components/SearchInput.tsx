import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onClear }) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() === '') {
      onClear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(input);
    }
  };

  return (
    <input
    type="text"
    className={'w-full p-4 text-3xl rounded-md text-gray-300 bg-black bg-opacity-40 border-none focus:ring-2 focus:ring-blue-700 focus:outline-none'}
    placeholder="Supersearch..."
    value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
