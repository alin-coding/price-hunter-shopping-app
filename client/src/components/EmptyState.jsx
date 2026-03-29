import React from 'react';

function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 animate-fade-in">
      <div className="text-6xl mb-5">🔍</div>
      <h3 className="text-white font-bold text-xl mb-2">No Results Found</h3>
      <p className="text-blue-200/70 text-center max-w-md leading-relaxed">
        We couldn't find any priced listings for{' '}
        <span className="text-white font-semibold">"{query}"</span> across the retailers
        we searched.
      </p>
      <div className="mt-6 glass-card px-5 py-4 max-w-sm w-full">
        <p className="text-blue-300/70 text-sm font-medium mb-2">Suggestions:</p>
        <ul className="text-blue-300/50 text-xs space-y-1.5 list-disc list-inside">
          <li>Try a shorter or more general product name</li>
          <li>Check your spelling</li>
          <li>Try a brand name + model number</li>
          <li>Remove special characters from your query</li>
        </ul>
      </div>
    </div>
  );
}

export default EmptyState;
