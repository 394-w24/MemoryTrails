import React from 'react';
import { Link } from "react-router-dom";
import "./TripCard.css";

  const Trip = ({ trip, tripId,  simpleView }) => (

    <div className="card" style={{ width: '18rem' }}>
      <img src={trip.locations[0].photos[0]} className="card-img-top" alt="Trip photo"/>
      <div className="card-body">
        <div className="card-title">
          <Link to={`/trip/${tripId}`} className="card-trip-name">
            {trip.name}
          </Link>
        </div>
        {!simpleView && (
          <div>
            <div className="card-footer">
              <div> start date: {trip.locations[0].date} </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


  export default Trip;