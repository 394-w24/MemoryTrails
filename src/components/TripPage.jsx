import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./TripPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import Button from 'react-bootstrap/Button';
import { useDbData } from "../utilities/firebase";
import AddMemoryForm from './AddMemory'; // Import the new component

const numberedIcon = (number) => new L.DivIcon({
  className: "custom-icon",
  html: `<img src="${icon}" alt="marker" /><span>${number}</span>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Location = ({ location, index }) => (
  <div className="location" id={`location-${index}`}>
    <h3>{location.location}</h3>
    <p>{location.date}</p>
    <div className="photos">
      {location.photos.map((photo, photoIndex) => (
        <div key={photoIndex} className="photo-container">
          <img src={photo} alt={location.location} className="photos-img" />
          <div className="photo-caption">{location.caption}</div>
        </div>
      ))}
    </div>
  </div>
);

const TripPage = () => {
  const { tripId } = useParams();
  const [activeLocation, setActiveLocation] = useState(null);
  const tripData = useDbData(`trips/${tripId}/`)[0];
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);
  
  const position = tripData?.locations?.[0]
    ? [tripData.locations[0].latitude, tripData.locations[0].longitude]
    : [0, 0]; // Default position if no locations

  useEffect(() => {
    if (tripData && tripData.locations && activeLocation !== null) {
      const locationElement = document.getElementById(`location-${activeLocation}`);
      if (locationElement) {
        locationElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeLocation, tripData]);

  if (!tripData) {
    return <div>Loading...</div>;
  }

  const locations = tripData.locations || [];

  return (
    <div className="wrap">
      <div className="trip-header">
        <div>
          <h2 className="trip-title">{tripData.name}</h2>
          <div className="members">Members: {tripData.members.length === 1 ? tripData.members[0] : tripData.members.join(", ")}</div>
        </div>
        <Button variant="primary" onClick={() => setShowAddMemoryModal(true)} className="upload-button add-memories-button">
          <span className="upload-button-word">Add Memories</span>
        </Button>
      </div>
      <div className="trip-content">
        <div className="trip-map">
          <MapContainer center={position} zoom={8} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((location, index) => (
              <Marker key={index} position={[location.latitude, location.longitude]} icon={numberedIcon(index + 1)}>
                <Popup>{location.location}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="trip-info">
          {locations.map((location, index) => (
            <Location key={index} index={index} location={location} />
          ))}
        </div>
      </div>
      <AddMemoryForm
        show={showAddMemoryModal}
        handleClose={() => setShowAddMemoryModal(false)}
        tripId={tripId}
        tripData={tripData}
      />
    </div>
  );
};

export default TripPage;
