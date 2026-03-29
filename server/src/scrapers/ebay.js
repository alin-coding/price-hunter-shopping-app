const { withPage } = require('./browserPool');
const { parsePrice, buildResult } = require('./utils');

async function scrapeEbay(query) {
  return withPage(async (page) => {
    const encoded = encodeURIComponent(query);
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encoded}&_sop=15&LH_BIN=1`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.waitForSelector('.s-item', { timeout: 10000 }).catch(() => null);

    const items = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('.s-item');

      for (let i = 0; i < Math.min(cards.length, 6); i++) {
        const card = cards[i];

        const titleEl = card.querySelector('.s-item__title');
        const title = titleEl ? titleEl.textContent.trim() : null;
        if (!title || title === 'Shop on eBay') continue;

        const priceEl = card.querySelector('.s-item__price');
        const priceText = priceEl ? priceEl.textContent.trim() : null;

        const linkEl = card.querySelector('.s-item__link');
        const link = linkEl ? linkEl.getAttribute('href') : null;

        const imageEl = card.querySelector('.s-item__image-img');
        const image = imageEl ? imageEl.getAttribute('src') : null;

        const conditionEl = card.querySelector('.SECONDARY_INFO');
        const condition = conditionEl ? conditionEl.textContent.trim() : null;

        if (title && priceText && link) {
          results.push({ title, priceText, link, image, condition });
        }
      }
      return results;
    });

    return items
      .filter(item => !item.priceText.includes(' to '))
      .map(item =>
        buildResult({
          store: 'eBay',
          title: item.title,
          price: parsePrice(item.priceText),
          priceText: item.priceText,
          link: item.link,
          image: item.image,
          badge: item.condition,
          logo: 'ebay',
        })
      ).filter(r => r !== null);
  });
}

module.exports = scrapeEbay;
