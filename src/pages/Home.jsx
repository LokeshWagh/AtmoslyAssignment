import React, { useState } from 'react';
import Filter from '../component/Filters';
import LaunchCard from '../component/LaunchCard';
import Navbar from '../component/Navbar';  

function Home() {
  const [searchMission, setSearchMission] = useState('');
  const [filterYear, setFilterYear] = useState('All years');
  const [successfulOnly, setSuccessfulOnly] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);  // New state for favorites toggle

  return (
    <>
      <Navbar showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
      <center><h1>Hellow</h1></center>
      <Filter
        searchMission={searchMission}
        setSearchMission={setSearchMission}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        successfulOnly={successfulOnly}
        setSuccessfulOnly={setSuccessfulOnly}
      />
      <LaunchCard
        searchMission={searchMission}
        filterYear={filterYear}
        successfulOnly={successfulOnly}
        showFavorites={showFavorites}  // Pass to LaunchCard for filtering
      />
    </>
  );
}

export default Home;
