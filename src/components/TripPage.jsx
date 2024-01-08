import React from 'react';
import tripData from '../../data/data.json';
import './TripPage.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


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
  const position = [43.0722, -89.4008];
  return (
    <div>
      <h2>{tripData.name}</h2>
      <div className="members">
        <strong>Members:</strong> {tripData.members.join(", ")}
      </div>
      <div className="wrap">
        <div className="trip-map">
          <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
          </MapContainer>
        </div>
        <div className="trip-info">
          {tripData.locations.map((location, index) => (
            <Location key={index} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripPage;

