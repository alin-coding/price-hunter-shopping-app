import React from 'react';

function Header() {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">Price Hunter</h1>
            <p className="text-blue-300 text-xs mt-0.5">Find the cheapest deals instantly</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-blue-300 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></span>
          <span>5 Retailers Monitored</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
