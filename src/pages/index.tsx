// src/pages/index.tsx
import SpotlightSearch from '../components/SpotlightSearch';

// src/pages/index.tsx
const Home: React.FC = () => {
  return (
    <div className="min-h-screen h-full bg-gray-100 flex justify-center items-center">
      <SpotlightSearch />
    </div>
  );
};

export default Home;