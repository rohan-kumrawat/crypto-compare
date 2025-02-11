import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (query.length < 2) return;
    
      try {
        const { data } = await axios.get('http://localhost:5000/api/crypto/coins');
        console.log("API Response:", data); // Debugging
        console.log("API Response Data:", data.data); // Debugging
    
        const filtered = data.data.filter(coin => 
          coin.name.toLowerCase().includes(query.toLowerCase()) || 
          coin.symbol.toLowerCase() === query.toLowerCase()
        );
    
        console.log("Filtered Coins:", filtered); // Debugging
        setCoins(filtered.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    fetchCoins();    

    const timer = setTimeout(fetchCoins, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative mb-8">
      <div className="flex items-center bg-white dark:bg-dark-800 rounded-lg shadow-lg px-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Bitcoin, Ethereum..."
          className="w-full p-3 bg-transparent outline-none dark:text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {coins.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-dark-800 rounded-lg shadow-xl">
          {coins.map(coin => (
            <div
              key={coin.id}
              onClick={() => {
                onSelect(coin.id);
                setQuery('');
                setCoins([]);
              }}
              className="p-3 hover:bg-gray-100 dark:hover:bg-dark-700 cursor-pointer border-b dark:border-dark-700"
            >
              <span className="font-medium dark:text-white">{coin.name}</span>
              <span className="text-sm text-gray-500 ml-2">({coin.symbol.toUpperCase()})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
SearchBar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SearchBar;