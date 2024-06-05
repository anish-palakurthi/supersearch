import axios from 'axios';

interface SearchResultItemProps {
  result: string;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  const handleClick = () => {
    openFile(result);
  };

  return (
    <button 
      type="button"
      className="p-4 hover:bg-gray-500 cursor-pointer text-left w-full" 
      onClick={handleClick}
      onKeyUp={(e) => e.key === 'Enter' && handleClick()}
    >
      {result}
    </button>
  );
};

const openFile = async (filePath: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/open-file?filePath=${(filePath)}`);
    if (response.status !== 200) {
      throw new Error('Error opening file');
    }
    const fileContent = response.data;
    console.log(`File content: ${fileContent}`);
  } catch (error) {
    console.error(error);
  }
};

export default SearchResultItem;