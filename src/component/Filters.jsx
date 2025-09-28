import React from 'react';

function Filter({
  searchMission,
  setSearchMission,
  filterYear,
  setFilterYear,
  successfulOnly,
  setSuccessfulOnly
}) {
  return (
    <div className="flex flex-wrap justify-center mb-7">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-auto flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex flex-col">
            <label htmlFor="searchMission" className="text-sm font-medium text-black mb-1">
              Search by mission name
            </label>
            <input
              id="searchMission"
              type="text"
              placeholder="e.g., Starlink, CRS, Demo..."
              value={searchMission}
              onChange={(e) => setSearchMission(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-[260px]"
            />
          </div>
          <div className="flex flex-col md:ml-6">
            <label htmlFor="launchYear" className="text-sm font-medium text-black mb-1">
              Year
            </label>
            <select
              id="launchYear"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-[220px] bg-white"
            >
              <option>All years</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
          </div>
          <div className="flex items-center md:ml-6 mt-4 md:mt-0">
            <input
              id="successfulOnly"
              type="checkbox"
              checked={successfulOnly}
              onChange={(e) => setSuccessfulOnly(e.target.checked)}
              className="w-5 h-5 text-blue-600 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <label htmlFor="successfulOnly" className="ml-2 text-sm font-medium text-black">
              Successful only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
