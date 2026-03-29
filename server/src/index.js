require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please wait a moment before searching again.' },
});
app.use('/api/', limiter);

app.use('/api/search', searchRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`✅ Price Hunter server running on http://localhost:${PORT}`);
});
