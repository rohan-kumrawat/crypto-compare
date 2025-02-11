exports.processCoinData = (coins) => {
    return coins.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name
    }));
  };
  
  exports.processExchangeData = (tickers) => {
    return tickers.map(ticker => ({
      exchange: ticker.market.name,
      price: ticker.last,
      volume: ticker.converted_volume.usd,
      trust_score: ticker.trust_score,
      last_traded: ticker.last_traded_at,
      trade_url: ticker.trade_url
    }));
  };