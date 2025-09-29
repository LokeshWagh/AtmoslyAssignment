import React, { useState, useEffect } from "react";

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

  // Debounce effect (no lodash, no useMemo)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchMission(inputValue);
    }, 200); // 200ms debounce
    return () => clearTimeout(handler);
  }, [inputValue, setSearchMission]);

  // Keep inputValue in sync if searchMission changes from outside
  useEffect(() => {
    setInputValue(searchMission || "");
  }, [searchMission]);

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
              onChange={(e) => setInputValue(e.target.value)}
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
            <label className=" mt-4 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={successfulOnly}
                onChange={(e) => setSuccessfulOnly(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600">
                <div className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-full" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900 ">
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
