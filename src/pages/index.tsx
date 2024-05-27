import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
