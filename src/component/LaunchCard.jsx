import React, { useState, useEffect } from 'react';
import Modal from './Modal';  // Import the new Modal component
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function LaunchCard({ searchMission, filterYear, successfulOnly, showFavorites }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null);  // State for selected launch to show in modal

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteLaunches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(res => res.json())
      .then(data => {
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
    localStorage.setItem('favoriteLaunches', JSON.stringify(favorites));
  }, [favorites]);

  if (loading) return <div>Loading...</div>;
  if (!launches.length) return <div>No launch data available</div>;

  // Filter launches by mission name, year, success, and favorites
  const filteredLaunches = launches.filter(launch => {
    const missionMatch = searchMission
      ? launch.name.toLowerCase().includes(searchMission.toLowerCase())
      : true;

    const launchYear = new Date(launch.date_utc).getFullYear();
    const yearMatch = filterYear && filterYear !== 'All years'
      ? launchYear.toString() === filterYear
      : true;

    const successMatch = successfulOnly ? launch.success : true;

    const favoriteMatch = showFavorites ? favorites.includes(launch.id) : true;

    return missionMatch && yearMatch && successMatch && favoriteMatch;
  });

  // Toggle favorite
  const toggleFavorite = (launchId) => {
    setFavorites(prev =>
      prev.includes(launchId)
        ? prev.filter(id => id !== launchId)
        : [...prev, launchId]
    );
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center items-center px-[10%]">
        {filteredLaunches.map(launch => {
          const launchDate = new Date(launch.date_utc);
          const year = launchDate.getFullYear();
          const isFavorite = favorites.includes(launch.id);

          return (
            <div key={launch.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-[330px] w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-900">{launch.name}</span>
                <button 
                  onClick={() => toggleFavorite(launch.id)}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition"
                >
                  {isFavorite ? <MdFavorite className="text-yellow-500" /> : <MdFavoriteBorder className="text-gray-500" />}
                  
                </button>
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {launchDate.toLocaleDateString()} {launchDate.toLocaleTimeString()} · {launch.rocket}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium rounded bg-gray-200 px-2 py-0.5 text-gray-700">
                  {launch.tbd ? "TBD" : "Confirmed"}
                </span>
                <span className="text-xs font-medium rounded bg-blue-100 text-blue-700 px-2 py-0.5">{year}</span>
              </div>
              <button 
                className="text-xs font-medium underline text-gray-700 hover:text-blue-700 transition"
                onClick={() => setSelectedLaunch(launch)}  // Open modal with this launch's data
              >
                View details
              </button>
            </div>
          );
        })}
      </div>
      {selectedLaunch && (
        <Modal 
          launch={selectedLaunch} 
          onClose={() => setSelectedLaunch(null)}  // Close modal
        />
      )}
    </>
  );
}

export default LaunchCard;
