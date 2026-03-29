import React from 'react';

const STORE_STYLES = {
  amazon:  { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-400/30' },
  ebay:    { bg: 'bg-red-500/20',    text: 'text-red-300',    border: 'border-red-400/30' },
  walmart: { bg: 'bg-blue-500/20',   text: 'text-blue-300',   border: 'border-blue-400/30' },
  target:  { bg: 'bg-red-600/20',    text: 'text-red-400',    border: 'border-red-500/30' },
  bestbuy: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30' },
};

const STORE_ICONS = {
  amazon:  '📦',
  ebay:    '🏷️',
  walmart: '🛒',
  target:  '🎯',
  bestbuy: '💻',
};

function StoreLogo({ store, logo }) {
  const style = STORE_STYLES[logo] || { bg: 'bg-white/10', text: 'text-white', border: 'border-white/20' };
  const icon = STORE_ICONS[logo] || '🛍️';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold
                      ${style.bg} ${style.text} ${style.border}`}>
      <span>{icon}</span>
      {store}
    </span>
  );
}

export default StoreLogo;
