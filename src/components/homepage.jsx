import React from "react";
import Trip from "./TripCard.jsx";
import MapPage from "./MapPage.jsx";
import "./HomePage.css";
import { useDbData } from "../utilities/firebase.js";

const HomePage = () => {
  const tripData = useDbData("trips/");

  if (tripData[0] === undefined) {
    return <div></div>;
  }
  return (
    <div>
      <div>
        <MapPage />
      </div>
      <div className="trip-list">
        {Object.entries(tripData[0]).map(([tripId, trip]) => (
          <Trip key={tripId} tripId={tripId} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
