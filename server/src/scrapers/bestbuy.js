const { withPage } = require('./browserPool');
const { parsePrice, buildResult } = require('./utils');

async function scrapeBestBuy(query) {
  return withPage(async (page) => {
    const encoded = encodeURIComponent(query);
    const url = `https://www.bestbuy.com/site/searchpage.jsp?st=${encoded}&order=PRICELOW`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.waitForSelector('.sku-item', { timeout: 10000 }).catch(() => null);

    const items = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('.sku-item');

      for (let i = 0; i < Math.min(cards.length, 5); i++) {
        const card = cards[i];

        const titleEl = card.querySelector('.sku-title a') ||
                        card.querySelector('.sku-header a');
        const title = titleEl ? titleEl.textContent.trim() : null;

        const priceEl = card.querySelector('.priceView-customer-price span') ||
                        card.querySelector('[data-testid="customer-price"] span');
        const priceText = priceEl ? priceEl.textContent.trim() : null;

        const linkEl = card.querySelector('.sku-title a') || card.querySelector('a.image-link');
        const href = linkEl ? linkEl.getAttribute('href') : null;
        const link = href
          ? (href.startsWith('http') ? href : `https://www.bestbuy.com${href}`)
          : null;

        const imageEl = card.querySelector('img.product-image');
        const image = imageEl ? imageEl.getAttribute('src') : null;

        const ratingEl = card.querySelector('.c-ratings-reviews .sr-only');
        const rating = ratingEl ? ratingEl.textContent.trim() : null;

        if (title && priceText && link) {
          results.push({ title, priceText, link, image, rating });
        }
      }
      return results;
    });

    return items.map(item =>
      buildResult({
        store: 'Best Buy',
        title: item.title,
        price: parsePrice(item.priceText),
        priceText: item.priceText,
        link: item.link,
        image: item.image,
        rating: item.rating,
        logo: 'bestbuy',
      })
    ).filter(r => r !== null);
  });
}

module.exports = scrapeBestBuy;
