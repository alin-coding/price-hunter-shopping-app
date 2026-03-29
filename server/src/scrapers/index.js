const scrapeAmazon = require('./amazon');
const scrapeEbay = require('./ebay');
const scrapeWalmart = require('./walmart');
const scrapeTarget = require('./target');
const scrapeBestBuy = require('./bestbuy');

const scrapers = [
  { name: 'Amazon', fn: scrapeAmazon },
  { name: 'eBay', fn: scrapeEbay },
  { name: 'Walmart', fn: scrapeWalmart },
  { name: 'Target', fn: scrapeTarget },
  { name: 'Best Buy', fn: scrapeBestBuy },
];

async function scrapeAll(query) {
  const results = await Promise.allSettled(
    scrapers.map(({ name, fn }) =>
      fn(query).catch(err => {
        console.warn(`[${name}] Scraper failed: ${err.message}`);
        return [];
      })
    )
  );

  const all = [];
  results.forEach((result, i) => {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      all.push(...result.value);
    } else {
      console.warn(`[${scrapers[i].name}] Rejected or returned invalid data`);
    }
  });

  return all;
}

module.exports = scrapeAll;
