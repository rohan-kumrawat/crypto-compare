import { useState, useEffect } from 'react';
import axios from 'axios';

const useCryptoData = (coinId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!coinId) return;
      
      setLoading(true);
      try {
        const [pricesRes, historyRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/crypto/prices/${coinId}`),
          axios.get(`http://localhost:5000/api/crypto/history/${coinId}?days=7`)
        ]);
        
        setData({
          prices: pricesRes.data.data,
          history: historyRes.data.data
        });
        setError(null);
      } catch (err) {
        setError('Data fetch failed. Please try again.');
      }
      setLoading(false);
    };

    fetchData();
  }, [coinId]);

  return { data, loading, error };
};

export default useCryptoData;