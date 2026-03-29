import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'Scanning Amazon…',
  'Checking eBay listings…',
  'Browsing Walmart deals…',
  'Looking at Target prices…',
  'Searching Best Buy…',
  'Comparing all results…',
  'Almost there…',
];

function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(i => (i + 1) % MESSAGES.length);
      setProgress(p => Math.min(p + 14, 90));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-blue-900/50 border-t-blue-400
                        animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🎯
        </div>
      </div>

      <p className="text-white font-semibold text-lg mb-2 transition-all duration-500">
        {MESSAGES[messageIndex]}
      </p>
      <p className="text-blue-300/70 text-sm mb-6">
        Scraping live prices from 5 retailers
      </p>

      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-2500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 flex gap-3">
        {['Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy'].map((store, i) => (
          <div
            key={store}
            className="flex flex-col items-center gap-1"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                          transition-all duration-500 ${
                messageIndex >= i
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-white/10 text-blue-400/50'
              }`}
            >
              {messageIndex > i ? '✓' : store[0]}
            </div>
            <span className="text-blue-400/50 text-xs hidden sm:block">{store}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSpinner;
