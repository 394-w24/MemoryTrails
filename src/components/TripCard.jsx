import React from 'react';
import "./TripCard.css";

  const Trip = ({ trip, simpleView }) => (
    <div className="card" style={{ width: '18rem' }} onClick={() => console.log("clicked")}>
      <img src={trip.locations[0].photos[0]} className="card-img-top" alt="Trip photo"/>
      <div className="card-body">
        <div className="card-title">{trip.name}</div>
        {!simpleView && (
          <div className="card-footer"> start date: {trip.locations[0].date}, trip duration: {trip.duration} days </div>
        )}
      </div>
    </div>
  );
  

  export default Trip;