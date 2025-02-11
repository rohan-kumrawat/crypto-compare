const express = require('express');
const router = express.Router();
const {
  getAllCoins,
  getCoinDetails,
  getExchangePrices,
  getHistoricalData
} = require('../controllers/cryptoController');

router.get('/coins', getAllCoins);
router.get('/coins/:id', getCoinDetails);
router.get('/prices/:id', getExchangePrices);
router.get('/history/:id', getHistoricalData);

module.exports = router;