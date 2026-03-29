const express = require('express');
const router = express.Router();
const scrapeAll = require('../scrapers');

router.get('/', async (req, res) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string' || q.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide a valid search query (at least 2 characters).' });
  }

  const query = q.trim();
  console.log(`[Search] Query: "${query}"`);

  try {
    const results = await scrapeAll(query);

    if (!results || results.length === 0) {
      return res.json({ query, results: [], message: 'No results found for this item.' });
    }

    const sorted = results
      .filter(r => r.price !== null && r.price !== undefined && !isNaN(r.price))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    res.json({ query, results: sorted });
  } catch (err) {
    console.error('[Search Route Error]', err.message);
    res.status(500).json({ error: 'Failed to fetch price data. Please try again.' });
  }
});

module.exports = router;
