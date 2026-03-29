import React from 'react';
import PriceComparisonCard from './PriceComparisonCard';

const RANK_CONFIG = [
  {
    rank: 1,
    label: '🥇 Best Deal',
    badgeClass: 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300',
    cardClass: 'ring-2 ring-yellow-400/40 bg-gradient-to-br from-yellow-500/10 to-white/5',
    rankBadgeClass: 'bg-yellow-400 text-yellow-900',
  },
  {
    rank: 2,
    label: '🥈 Runner Up',
    badgeClass: 'bg-slate-400/20 border-slate-400/50 text-slate-300',
    cardClass: 'ring-1 ring-slate-400/20 bg-gradient-to-br from-slate-500/10 to-white/5',
    rankBadgeClass: 'bg-slate-400 text-slate-900',
  },
  {
    rank: 3,
    label: '🥉 Third Place',
    badgeClass: 'bg-orange-700/20 border-orange-600/50 text-orange-400',
    cardClass: 'ring-1 ring-orange-700/20 bg-gradient-to-br from-orange-800/10 to-white/5',
    rankBadgeClass: 'bg-orange-600 text-white',
  },
];

function ResultsList({ results, query }) {
  const savings =
    results.length >= 2
      ? (results[results.length - 1].price - results[0].price).toFixed(2)
      : null;

  return (
    <div className="animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-white font-bold text-xl">
            Top {results.length} Cheapest Results
          </h2>
          <p className="text-blue-300/70 text-sm mt-0.5">
            for "{query}" — sorted by lowest price
          </p>
        </div>

        {savings && parseFloat(savings) > 0 && (
          <div className="glass-card px-4 py-2.5 text-center sm:text-right shrink-0">
            <p className="text-green-400 font-bold text-sm">
              💰 Save up to ${savings}
            </p>
            <p className="text-blue-300/60 text-xs">vs most expensive shown</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {results.map((result, index) => {
          const config = RANK_CONFIG[index] || RANK_CONFIG[2];
          return (
            <div
              key={result.id}
              style={{ animationDelay: `${index * 120}ms` }}
              className="animate-slide-up"
            >
              <PriceComparisonCard
                result={result}
                rank={index + 1}
                config={config}
                isLowest={index === 0}
              />
            </div>
          );
        })}
      </div>

      <p className="text-center text-blue-400/40 text-xs mt-8">
        Prices scraped in real-time • Results may vary • Always verify before purchasing
      </p>
    </div>
  );
}

export default ResultsList;
