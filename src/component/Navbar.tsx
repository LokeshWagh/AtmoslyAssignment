import React from "react";

function Navbar({ showFavorites, setShowFavorites }) {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="mb-3 sm:mb-0">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
          Atmosly - SpaceX Mission Explorer
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fetch real data from the SpaceX public API. Filter, explore, and
          favorite launches.
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <label
          htmlFor="favoriteToggle"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Show favorites
        </label>
        {/* Updated Toggle Switch matching "Successful only" styling */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="favoriteToggle"
            type="checkbox"
            className="sr-only peer"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          <div
            className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full "
          ></div>
        </label>
      </div>

      {/* Responsive style for <=700px width */}
      <style>{`
        @media (max-width: 700px) {
          nav {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          nav > div:last-child {
            margin-top: 0.5rem !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
