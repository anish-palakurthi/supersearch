// src/pages/index.tsx

import SpotlightSearch from '../components/SpotlightSearch';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <SpotlightSearch />
    </div>
  );
};

export default Home;
