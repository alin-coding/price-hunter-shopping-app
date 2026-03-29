import React, { useState } from 'react';
import LinkButton from './LinkButton';
import StoreLogo from './StoreLogo';

function PriceComparisonCard({ result, rank, config, isLowest }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`glass-card p-5 transition-transform duration-200 hover:-translate-y-1 ${config.cardClass}`}>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
            {result.image && !imgError ? (
              <img
                src={result.image}
                alt={result.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-1"
              />
            ) : (
              <span className="text-3xl opacity-50">🛍️</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Top row: rank badge + store label + rank label */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`rank-badge ${config.rankBadgeClass} text-xs`}>
              #{rank}
            </span>
            <StoreLogo store={result.store} logo={result.logo} />
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${config.badgeClass}`}>
              {config.label}
            </span>
            {result.badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300">
                {result.badge}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-white font-semibold text-sm leading-snug mb-3 line-clamp-2">
            {result.title}
          </h3>

          {/* Bottom row: price + rating + button */}
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-2xl font-extrabold text-white">
                {result.priceText}
              </span>
              {isLowest && (
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 border border-green-500/30
                                  px-2 py-0.5 rounded-full font-medium">
                  Lowest!
                </span>
              )}
            </div>

            {result.rating && (
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <span>⭐</span>
                <span className="text-white/70">{result.rating}</span>
              </div>
            )}

            <div className="ml-auto">
              <LinkButton href={result.link} store={result.store} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceComparisonCard;
