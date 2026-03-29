# 🎯 Price Hunter Shopping App

A full-stack shopping app that scrapes **live prices** for any product across Amazon, eBay, Walmart, Target, and Best Buy — displaying the **top 3 cheapest results** with direct purchase links.

---

## 🏗️ Tech Stack

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | React 18, Tailwind CSS 3, Axios             |
| Backend  | Node.js, Express 4, Puppeteer (Stealth)     |
| Scraping | Puppeteer Extra + Stealth Plugin, Cheerio   |

---

## 📁 Project Structure

```
price-hunter-shopping-app/
├── package.json              # Root workspace + concurrently dev script
├── client/                   # React frontend
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── index.css
│       ├── App.jsx
│       ├── api/
│       │   └── searchApi.js
│       └── components/
│           ├── Header.jsx
│           ├── Footer.jsx
│           ├── SearchBar.jsx
│           ├── ResultsList.jsx
│           ├── PriceComparisonCard.jsx
│           ├── LinkButton.jsx
│           ├── StoreLogo.jsx
│           ├── LoadingSpinner.jsx
│           ├── ErrorMessage.jsx
│           └── EmptyState.jsx
└── server/                   # Express + Puppeteer backend
    ├── package.json
    ├── .env
    └── src/
        ├── index.js
        ├── routes/
        │   └── search.js
        └── scrapers/
            ├── index.js
            ├── browserPool.js
            ├── utils.js
            ├── amazon.js
            ├── ebay.js
            ├── walmart.js
            ├── target.js
            └── bestbuy.js
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- Google Chrome (Puppeteer will download Chromium automatically)

---

### 1. Clone & Install

```bash
# Install root dependencies (concurrently)
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies (includes Puppeteer — downloads Chromium ~170MB)
npm install --prefix server
```

> ⏳ The `npm install --prefix server` step may take a few minutes as Puppeteer downloads a bundled Chromium browser.

---

### 2. Configure Environment

The server `.env` file is pre-configured. Edit `server/.env` if you need to change ports:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
```

---

### 3. Run in Development Mode

```bash
npm run dev
```

This starts both servers concurrently:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

### 4. Run Separately (optional)

```bash
# Terminal 1 — Backend
npm run dev --prefix server

# Terminal 2 — Frontend
npm run dev --prefix client
```

---

## 🔌 API Endpoints

### `GET /api/search?q={query}`

Returns the top 3 cheapest results for the given query.

**Request:**
```
GET http://localhost:5000/api/search?q=iPhone+15+Pro
```

**Response:**
```json
{
  "query": "iPhone 15 Pro",
  "results": [
    {
      "id": "Amazon-1706123456789-abc123",
      "store": "Amazon",
      "title": "Apple iPhone 15 Pro 128GB Natural Titanium",
      "price": 899.99,
      "priceText": "$899.99",
      "link": "https://www.amazon.com/dp/XXXXXXXXXX",
      "image": "https://m.media-amazon.com/images/...",
      "rating": "4.6 out of 5 stars",
      "badge": null,
      "logo": "amazon"
    },
    ...
  ]
}
```

### `GET /api/health`

Health check endpoint.

---

## 🧩 Components

| Component              | Description                                              |
|------------------------|----------------------------------------------------------|
| `SearchBar`            | Input field with suggestions, clear button, submit       |
| `ResultsList`          | Renders top 3 results with savings summary               |
| `PriceComparisonCard`  | Full card with image, price, rating, rank badge          |
| `LinkButton`           | "Buy at [Store]" CTA that opens retailer in new tab      |
| `StoreLogo`            | Colour-coded store badge with icon                       |
| `LoadingSpinner`       | Animated scraping progress with per-retailer indicators  |
| `ErrorMessage`         | Error state with retry button and troubleshooting tips   |
| `EmptyState`           | No-results state with search improvement suggestions     |

---

## ⚠️ Important Notes

### Anti-Scraping Measures
Retailers actively work to prevent automated scraping. This prototype uses:
- **Puppeteer Extra Stealth Plugin** to bypass basic bot detection
- **Real Chrome UA headers** and HTTP accept headers
- **Headless "new" mode** for modern Chromium

Despite these measures, retailers may occasionally block requests or return empty pages. If searches fail:
1. Wait 30–60 seconds and try again
2. Try different product names
3. Some retailers (e.g., Walmart, Target) have more aggressive bot detection

### Performance
Each search launches **5 parallel browser instances** and scrapes simultaneously. Expect:
- ⏱️ **15–45 seconds** per search (depending on retailer speed)
- 💾 ~500MB RAM during active scraping

### Production Considerations
For production use, consider:
- Using a **residential proxy service** to avoid blocks
- Implementing a **scraping queue** with Redis
- Caching results in a database (MongoDB/Redis) with TTL
- Using **ScrapingBee** or **Bright Data** APIs instead of raw Puppeteer
- Adding **Playwright** as a fallback for stubborn sites

---

## 🚀 Build for Production

```bash
# Build React frontend
npm run build --prefix client

# Serve static files from Express (add static middleware to server/src/index.js)
npm start
```

---

## 📜 License

MIT — built as an educational prototype. Respect each retailer's Terms of Service before deploying commercially.
