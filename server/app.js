require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// Routes
app.use('/api/crypto', cryptoRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});