import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce"; // Import lodash debounce

function Filter({
  searchMission,
  setSearchMission,
  filterYear,
  setFilterYear,
  successfulOnly,
  setSuccessfulOnly,
}) {

  // Generate the years
  let years = [];
  for (let i = 2005; i < 2024; i++) {
    years.push(i + 1);
  }

  // Local state for input value
  const [inputValue, setInputValue] = useState(searchMission || "");

  // Memoized debounced setter using useMemo 
  const debouncedSetSearchMission = useMemo(
    () => debounce((value) => setSearchMission(value), 200), // 200ms delay
    [setSearchMission] // Dependency: recreates only if setSearchMission changes
  );

  // Handle input change: update local state and trigger debounced setter
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchMission(value); 
  };

  // Keep inputValue in sync if searchMission changes from outside
  useEffect(() => {
    setInputValue(searchMission || "");
  }, [searchMission]);

  // Cancel debounce on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      debouncedSetSearchMission.cancel();
    };
  }, [debouncedSetSearchMission]);

  const handleClear = () => {
    setInputValue("");
    setSearchMission("");
    setFilterYear("All years"); // Reset year filter as well
  };

  return (
    <div className="flex flex-wrap justify-center mb-7">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-auto flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex flex-col relative">
            <label
              htmlFor="searchMission"
              className="text-sm font-medium text-black mb-1"
            >
              Search by mission name
            </label>
            <input
              id="searchMission"
              type="text"
              placeholder="e.g., Starlink, CRS, Demo..."
              value={inputValue}
              onChange={handleInputChange} // Updated to use debounced handler
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-[260px]"
            />
          </div>
          <div className="flex flex-col md:ml-6">
            <label
              htmlFor="launchYear"
              className="text-sm font-medium text-black mb-1"
            >
              Year
            </label>
            <select
              id="launchYear"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-[220px] bg-white"
            >
              <option>All years</option>
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center md:ml-6 mt-4 md:mt-0">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="relative mt-4 mr-4 text-gray-500 hover:text-gray-800 text-xs px-4 py-3 bg-gray-200 rounded"
              >
                Clear
              </button>
            )}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={successfulOnly}
                onChange={(e) => setSuccessfulOnly(e.target.checked)}
              />
              <div
                className="
                  w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700
                  peer-checked:bg-blue-600
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                  after:bg-white after:border-gray-300 after:border
                  after:rounded-full after:h-5 after:w-5 after:transition-all
                  peer-checked:after:translate-x-full dark:peer-checked:bg-blue-600
                "
              ></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Successful only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
