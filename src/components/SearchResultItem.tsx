// src/components/SearchResultItem.tsx


interface SearchResultItemProps {
  result: string;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <li className="p-4 hover:bg-gray-100 cursor-pointer">
      {result}
    </li>
  );
};

export default SearchResultItem;
