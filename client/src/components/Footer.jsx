import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 mt-12">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-blue-400/60 text-sm">
          Price Hunter scrapes live retailer pages. Prices may vary. Always confirm before purchasing.
        </p>
        <p className="text-blue-400/40 text-xs mt-1">
          Built with React, Node.js, Puppeteer &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

export default Footer;
