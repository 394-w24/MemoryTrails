import React from "react";
import Trip from "./TripCard.jsx";
import MapPage from "./MapPage.jsx";
import "./HomePage.css";
import { useDbData } from "../utilities/firebase.js";

const HomePage = () => {
  const tripData = useDbData("trips/");
  //.sort((a, b) => new Date(a[1]?.locations[0]?.date) - new Date(b[1]?.locations[0]?.date))
  if (tripData[0] === undefined) {
    return <div></div>;
  }
  console.log("tripDate:", tripData)
  return (
    <div>
      <div>
        <MapPage />
      </div>
      <div className="trip-list">
        {Object.entries(tripData[0]).sort((a, b) => new Date(b[1]?.locations[0]?.date).getTime() - new Date(a[1]?.locations[0]?.date).getTime()).map(([tripId, trip]) => (
          <Trip key={tripId} tripId={tripId} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
