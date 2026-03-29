function parsePrice(priceText) {
  if (!priceText) return null;
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function buildResult({ store, title, price, priceText, link, image, rating, badge, logo }) {
  if (!title || price === null || !link) return null;
  if (price <= 0 || price > 100000) return null;

  return {
    id: `${store}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    store,
    title: title.length > 100 ? title.slice(0, 97) + '...' : title,
    price,
    priceText: priceText || `$${price.toFixed(2)}`,
    link,
    image: image || null,
    rating: rating || null,
    badge: badge || null,
    logo,
  };
}

module.exports = { parsePrice, buildResult };
