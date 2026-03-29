import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 animate-fade-in">
      <div className="text-6xl mb-5">⚠️</div>
      <h3 className="text-white font-bold text-xl mb-2">Search Failed</h3>
      <p className="text-blue-200/80 text-center max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
      <div className="mt-6 glass-card px-5 py-4 max-w-md w-full">
        <p className="text-blue-300/70 text-sm font-medium mb-2">Troubleshooting tips:</p>
        <ul className="text-blue-300/50 text-xs space-y-1 list-disc list-inside">
          <li>Make sure the backend server is running on port 5000</li>
          <li>Retailers may temporarily block scraping — try again in 30s</li>
          <li>Check your internet connection</li>
          <li>Try a more specific product name</li>
        </ul>
      </div>
    </div>
  );
}

export default ErrorMessage;
