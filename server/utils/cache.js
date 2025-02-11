const NodeCache = require('node-cache');

const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL || 300,
  checkperiod: 60
});

exports.getCache = (key) => cache.get(key);
exports.setCache = (key, data) => cache.set(key, data);