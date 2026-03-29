import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import Footer from './components/Footer';
import { searchPrices } from './api/searchApi';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(true);
    setLastQuery(searchQuery.trim());

    try {
      const data = await searchPrices(searchQuery.trim());
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearched(false);
    setLastQuery('');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onClear={handleClear}
          loading={loading}
        />

        <div className="mt-10">
          {loading && <LoadingSpinner />}

          {!loading && error && (
            <ErrorMessage message={error} onRetry={() => handleSearch(lastQuery)} />
          )}

          {!loading && !error && searched && results.length === 0 && (
            <EmptyState query={lastQuery} />
          )}

          {!loading && !error && results.length > 0 && (
            <ResultsList results={results} query={lastQuery} />
          )}

          {!loading && !error && !searched && (
            <HeroBanner />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="text-center mt-6 animate-fade-in">
      <div className="text-8xl mb-6">🎯</div>
      <h2 className="text-3xl font-bold text-white mb-3 text-shadow">
        Hunt the Best Price
      </h2>
      <p className="text-blue-200 text-lg max-w-xl mx-auto leading-relaxed">
        Search any product and we'll instantly compare prices across Amazon, eBay,
        Walmart, Target, and Best Buy — showing you the{' '}
        <span className="text-yellow-300 font-semibold">top 3 cheapest options</span> with
        direct buy links.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-300">
        {['Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy'].map(store => (
          <span
            key={store}
            className="glass-card px-4 py-2 rounded-full border border-white/20 text-white/70 font-medium"
          >
            {store}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
