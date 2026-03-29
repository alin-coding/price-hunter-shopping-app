const { withPage } = require('./browserPool');
const { parsePrice, buildResult } = require('./utils');

async function scrapeAmazon(query) {
  return withPage(async (page) => {
    const encoded = encodeURIComponent(query);
    const url = `https://www.amazon.com/s?k=${encoded}`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 }).catch(() => null);

    const items = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('[data-component-type="s-search-result"]');

      for (let i = 0; i < Math.min(cards.length, 5); i++) {
        const card = cards[i];

        const titleEl = card.querySelector('h2 a span') || card.querySelector('.a-size-medium');
        const title = titleEl ? titleEl.textContent.trim() : null;

        const priceWhole = card.querySelector('.a-price-whole');
        const priceFraction = card.querySelector('.a-price-fraction');
        let priceText = null;
        if (priceWhole) {
          const whole = priceWhole.textContent.replace(/[^0-9]/g, '');
          const frac = priceFraction ? priceFraction.textContent.replace(/[^0-9]/g, '') : '00';
          priceText = `${whole}.${frac}`;
        }

        const linkEl = card.querySelector('h2 a');
        const href = linkEl ? linkEl.getAttribute('href') : null;
        const link = href ? `https://www.amazon.com${href.split('?')[0]}` : null;

        const imageEl = card.querySelector('img.s-image');
        const image = imageEl ? imageEl.getAttribute('src') : null;

        const ratingEl = card.querySelector('.a-icon-alt');
        const rating = ratingEl ? ratingEl.textContent.trim() : null;

        if (title && priceText && link) {
          results.push({ title, priceText, link, image, rating });
        }
      }
      return results;
    });

    return items.map(item =>
      buildResult({
        store: 'Amazon',
        title: item.title,
        price: parsePrice(item.priceText),
        priceText: `$${item.priceText}`,
        link: item.link,
        image: item.image,
        rating: item.rating,
        logo: 'amazon',
      })
    ).filter(r => r !== null);
  });
}

module.exports = scrapeAmazon;
