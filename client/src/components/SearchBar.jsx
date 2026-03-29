import React, { useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'iPhone 15 Pro',
  'Sony WH-1000XM5',
  'Nintendo Switch OLED',
  'Air Fryer',
  'AirPods Pro',
  'Samsung 4K TV',
  'Kindle Paperwhite',
  'LEGO Star Wars',
];

function SearchBar({ value, onChange, onSearch, onClear, loading }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClear();
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for any product… e.g. iPhone 15 Pro"
              disabled={loading}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-white placeholder-blue-300/60
                         bg-white/10 border border-white/20 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                         disabled:opacity-60 disabled:cursor-not-allowed
                         text-base transition-all duration-200"
              autoComplete="off"
            />

            {value && !loading && (
              <button
                type="button"
                onClick={onClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/60
                           hover:text-white transition-colors duration-150"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="btn-primary flex items-center gap-2 min-w-[120px] justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
                Hunting…
              </>
            ) : (
              <>
                <span>🎯</span>
                Hunt Prices
              </>
            )}
          </button>
        </div>
      </form>

      {!loading && !value && (
        <div className="mt-4 flex flex-wrap gap-2 animate-fade-in">
          <span className="text-blue-400/60 text-xs self-center">Try:</span>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => { onChange(s); onSearch(s); }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15
                         text-blue-200 hover:bg-white/20 hover:text-white
                         transition-all duration-150 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
