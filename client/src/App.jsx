import { useState } from 'react';
import { useTheme } from './contexts/ThemeContext'; // ✅ Correct import
import { ThemeProvider } from './contexts/ThemeContext';
import SearchBar from './components/SearchBar';
import PriceTable from './components/PriceTable';
import PriceChart from './components/PriceChart';
import ThemeToggle from './components/ThemeToggle';
import useCryptoData from './hooks/useCryptoData';

const App = () => {
  const { isDark } = useTheme(); // ✅ Correct way

  const [selectedCoin, setSelectedCoin] = useState(null);
  const { data, loading, error } = useCryptoData(selectedCoin);

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isDark ? 'dark' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Crypto Price Tracker
          </h1>
          <ThemeToggle />
        </div>

        <SearchBar onSelect={setSelectedCoin} />

        {loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Loading prices...
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        )}

        {data && (
          <>
            <PriceTable data={data.prices} />
            <PriceChart data={data.history} />
          </>
        )}
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default WrappedApp;
