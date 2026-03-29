const { withPage } = require('./browserPool');
const { parsePrice, buildResult } = require('./utils');

async function scrapeWalmart(query) {
  return withPage(async (page) => {
    const encoded = encodeURIComponent(query);
    const url = `https://www.walmart.com/search?q=${encoded}&sort=price_low`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.waitForSelector('[data-item-id]', { timeout: 10000 }).catch(() => null);

    const items = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('[data-item-id]');

      for (let i = 0; i < Math.min(cards.length, 5); i++) {
        const card = cards[i];

        const titleEl = card.querySelector('[data-automation-id="product-title"]') ||
                        card.querySelector('.w_iUH7');
        const title = titleEl ? titleEl.textContent.trim() : null;

        const priceEl = card.querySelector('[itemprop="price"]') ||
                        card.querySelector('.mr1.mr2-xl.b.black.lh-copy.f5.f4-l');
        const priceText = priceEl
          ? (priceEl.getAttribute('content') || priceEl.textContent.trim())
          : null;

        const linkEl = card.querySelector('a');
        const href = linkEl ? linkEl.getAttribute('href') : null;
        const link = href
          ? (href.startsWith('http') ? href : `https://www.walmart.com${href}`)
          : null;

        const imageEl = card.querySelector('img');
        const image = imageEl ? imageEl.getAttribute('src') : null;

        const ratingEl = card.querySelector('.f7.rating-number');
        const rating = ratingEl ? ratingEl.textContent.trim() : null;

        if (title && priceText && link) {
          results.push({ title, priceText, link, image, rating });
        }
      }
      return results;
    });

    return items.map(item =>
      buildResult({
        store: 'Walmart',
        title: item.title,
        price: parsePrice(item.priceText),
        priceText: item.priceText.startsWith('$') ? item.priceText : `$${item.priceText}`,
        link: item.link,
        image: item.image,
        rating: item.rating,
        logo: 'walmart',
      })
    ).filter(r => r !== null);
  });
}

module.exports = scrapeWalmart;
