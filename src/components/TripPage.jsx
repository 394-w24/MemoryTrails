import React from 'react';
import tripData from '../../data/data.json';

const Location = ({ location }) => (
  <div className="location">
    <h3>{location.location}</h3>
    <p>{location.date}</p>
    <p>{location.caption}</p>
    <div className="photos">
      {location.photos.map(photo => (
        <img key={photo} src={photo} alt={location.location} />
      ))}
    </div>
  </div>
);

const TripPage = () => {
  return (
    <div>
      <h2>{tripData.name}</h2>
      <div className="members">
        <strong>Members:</strong> {tripData.members.join(", ")}
      </div>
      <div className="locations">
        {tripData.locations.map((location, index) => (
          <Location key={index} location={location} />
        ))}
      </div>
    </div>
  );
};

export default TripPage;

