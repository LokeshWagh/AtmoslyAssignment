import React, { useState, useEffect, useRef, useMemo } from "react";
import Modal from "./Modal";
import Skeleton from "./Skeleton";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function LaunchCard({
  searchMission,
  filterYear,
  successfulOnly,
  showFavorites,
}) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null); // State for selected launch to show in modal

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteLaunches");
    return saved ? JSON.parse(saved) : [];
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 18;

  // Ref for scrolling to top
  const launchesContainerRef = useRef(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((res) => res.json())
      .then((data) => {
        setLaunches(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoriteLaunches", JSON.stringify(favorites));
  }, [favorites]);

  // Reset current page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchMission, filterYear, successfulOnly, showFavorites]);

  // Memoize filtered launches for performance
  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      const missionMatch = searchMission
        ? launch.name.toLowerCase().includes(searchMission.toLowerCase())
        : true;

      const launchYear = new Date(launch.date_utc).getFullYear();
      const yearMatch =
        filterYear && filterYear !== "All years"
          ? launchYear.toString() === filterYear
          : true;

      const successMatch = successfulOnly ? launch.success : true;

      const favoriteMatch = showFavorites ? favorites.includes(launch.id) : true;

      return missionMatch && yearMatch && successMatch && favoriteMatch;
    });
  }, [launches, searchMission, filterYear, successfulOnly, showFavorites, favorites]);

  if (loading)
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  if (!filteredLaunches.length) return ;

  // Pagination logic
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = filteredLaunches.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );
  const totalPages = Math.ceil(filteredLaunches.length / launchesPerPage);

  // Toggle favorite
  const toggleFavorite = (launchId) => {
    setFavorites((prev) =>
      prev.includes(launchId)
        ? prev.filter((id) => id !== launchId)
        : [...prev, launchId]
    );
  };

  // Function to change page and scroll to top
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (launchesContainerRef.current) {
        launchesContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div
        ref={launchesContainerRef}
        className="flex flex-wrap gap-4 justify-center items-center px-[10%]"
      >
        {currentLaunches.map((launch) => {
          const launchDate = new Date(launch.date_utc);
          const year = launchDate.getFullYear();
          const isFavorite = favorites.includes(launch.id);

          return (
            <div
              key={launch.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-[330px] w-full"
              onClick={() => setSelectedLaunch(launch)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-900">
                  {launch.name}
                </span>
                <button
                  onClick={() => toggleFavorite(launch.id)}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition"
                >
                  {isFavorite ? (
                    <MdFavorite className="text-yellow-500" />
                  ) : (
                    <MdFavoriteBorder className="text-gray-500" />
                  )}
                  Favorite
                </button>
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {launchDate.toLocaleDateString()} {launchDate.toLocaleTimeString()} · {launch.rocket}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium rounded bg-gray-200 px-2 py-0.5 text-gray-700">
                  {launch.tbd ? "TBD" : "Confirmed"}
                </span>
                <span className="text-xs font-medium rounded bg-blue-100 text-blue-700 px-2 py-0.5">
                  {year}
                </span>
              </div>
              <button
                className="text-xs font-medium underline text-gray-700 hover:text-blue-700 transition"
                onClick={() => setSelectedLaunch(launch)}
              >
                View details
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-6 mb-10 gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <select
          value={currentPage}
          onChange={(e) => changePage(Number(e.target.value))}
          className="border rounded px-4 py-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <option key={pageNum} value={pageNum}>
                Page {pageNum}
                <span> of {totalPages}</span>
              </option>
            )
          )}
        </select>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedLaunch && (
        <Modal
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
    </>
  );
}

export default LaunchCard;

