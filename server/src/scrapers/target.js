const { withPage } = require('./browserPool');
const { parsePrice, buildResult } = require('./utils');

async function scrapeTarget(query) {
  return withPage(async (page) => {
    const encoded = encodeURIComponent(query);
    const url = `https://www.target.com/s?searchTerm=${encoded}&sortBy=priceAsc`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.waitForSelector('[data-test="product-details"]', { timeout: 12000 }).catch(() => null);

    const items = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('[data-test="product-details"]');

      for (let i = 0; i < Math.min(cards.length, 5); i++) {
        const card = cards[i];

        const titleEl = card.querySelector('[data-test="product-title"]') ||
                        card.querySelector('a[data-test="product-title"]');
        const title = titleEl ? titleEl.textContent.trim() : null;

        const priceEl = card.querySelector('[data-test="current-price"]') ||
                        card.querySelector('span[data-test="product-price"]');
        const priceText = priceEl ? priceEl.textContent.trim() : null;

        const linkEl = card.querySelector('a');
        const href = linkEl ? linkEl.getAttribute('href') : null;
        const link = href
          ? (href.startsWith('http') ? href : `https://www.target.com${href}`)
          : null;

        const imageEl = document.querySelector(`[data-test="product-image"] img`);
        const image = imageEl ? imageEl.getAttribute('src') : null;

        if (title && priceText && link) {
          results.push({ title, priceText, link, image });
        }
      }
      return results;
    });

    return items.map(item =>
      buildResult({
        store: 'Target',
        title: item.title,
        price: parsePrice(item.priceText),
        priceText: item.priceText,
        link: item.link,
        image: item.image,
        logo: 'target',
      })
    ).filter(r => r !== null);
  });
}

module.exports = scrapeTarget;
