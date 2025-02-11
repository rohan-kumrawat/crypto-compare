const axios = require('axios');
const { getCache, setCache } = require('../utils/cache');
const { processCoinData, processExchangeData } = require('../utils/apiHelpers');

exports.getAllCoins = async (req, res) => {
  try {
    const cacheKey = 'all-coins';
    const cachedData = getCache(cacheKey);
    
    if(cachedData) return res.json(cachedData);

    const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/list`);
    const processedData = processCoinData(response.data);
    
    setCache(cacheKey, processedData);
    res.json({ success: true, data: processedData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch coins list'
    });
  }
};

exports.getCoinDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `coin-${id}`;

    const cachedData = getCache(cacheKey);
    if(cachedData) return res.json(cachedData);

    const response = await axios.get(
      `${process.env.COINGECKO_API_URL}/coins/${id}`
    );

    const coinData = {
      id: response.data.id,
      name: response.data.name,
      symbol: response.data.symbol,
      current_price: response.data.market_data.current_price.usd,
      market_cap: response.data.market_data.market_cap.usd,
      price_change_24h: response.data.market_data.price_change_percentage_24h
    };

    setCache(cacheKey, coinData);
    res.json({ success: true, data: coinData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch coin details'
    });
  }
};

exports.getExchangePrices = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `prices-${id}`;

    const cachedData = getCache(cacheKey);
    if(cachedData) return res.json(cachedData);

    const response = await axios.get(
      `${process.env.COINGECKO_API_URL}/coins/${id}/tickers`
    );

    const processedData = processExchangeData(response.data.tickers);
    setCache(cacheKey, processedData);
    
    res.json({ 
      success: true,
      data: processedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exchange prices'
    });
  }
};

exports.getHistoricalData = async (req, res) => {
  try {
    const { id } = req.params;
    const { days = '7' } = req.query;
    const cacheKey = `history-${id}-${days}`;

    const cachedData = getCache(cacheKey);
    if(cachedData) return res.json(cachedData);

    const response = await axios.get(
      `${process.env.COINGECKO_API_URL}/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: days
        }
      }
    );

    const processedData = response.data.prices.map(([timestamp, price]) => ({
      timestamp,
      price
    }));

    setCache(cacheKey, processedData);
    res.json({ success: true, data: processedData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch historical data'
    });
  }
};