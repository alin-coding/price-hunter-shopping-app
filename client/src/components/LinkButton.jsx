import React, { useState } from 'react';

function LinkButton({ href, store }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
                  transition-all duration-200 shadow-md
                  ${clicked
                    ? 'bg-green-600 text-white scale-95'
                    : 'bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-0.5 hover:shadow-blue-500/30 hover:shadow-lg'
                  }`}
    >
      {clicked ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Opening…
        </>
      ) : (
        <>
          Buy at {store}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </>
      )}
    </a>
  );
}

export default LinkButton;
