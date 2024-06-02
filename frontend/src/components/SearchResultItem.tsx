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
    const response = await fetch(`http://localhost:3001/open-file?filePath=${(filePath)}`);
    if (!response.ok) {
      throw new Error('Error opening file');
    }
    const fileContent = await response.text();
    console.log(`File content: ${fileContent}`);
  } catch (error) {
    console.error(error);
  }
};

export default SearchResultItem;