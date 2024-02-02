import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
// import tripData from "../../data/data.json";
import "./TripPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useDbData } from "../utilities/firebase";

const customIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const numberedIcon = (number) => new L.DivIcon({
  className: "custom-icon",
  html: `<img src="${icon}" alt="marker" /><span>${number}</span>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Location = ({ location, index  }) => (
  <div className="location" id={`location-${index}`}>
    <h3>{location.location}</h3>
    <p>{location.date}</p>
    <p>{location.caption}</p>
    <div className="photos">
      {location.photos.map((photo) => (
        <img key={photo} src={photo} alt={location.location} />
      ))}
    </div>
  </div>
);

const TripPage = () => {
  const { tripId } = useParams();
  console.log("trip id:",tripId)
  const [activeLocation, setActiveLocation] = useState(null);
  const tripData = useDbData(`trips/${tripId}/`)[0];
  console.log(tripData);
  const position = [tripData?.locations?.[0]?.latitude, tripData?.locations?.[0]?.longitude];


  useEffect(() => {
    console.log(`Active location index: ${activeLocation}`);
    if (tripData && tripData.locations && activeLocation !== null) {
      const locationElement = document.getElementById(`location-${activeLocation}`);
      console.log(`Scrolling to location ${activeLocation}`, locationElement);
      if (locationElement) {
        locationElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeLocation, tripData]);




  console.log(tripData);

  if(tripData === undefined) {
    return(<div></div>)
  }


  // console.log("Number of locations:", tripData.locations.length);
  return (
    <div>
     
      <div className="wrap">
        <div className="trip-header">
          <h2 style={{marginTop:'60px', marginLeft: '25px'}} className="trip-title">{tripData.name}</h2>
          <div className="members" style={{marginTop:'100px', marginLeft:'-325px'}}>
            <strong>Members:</strong> {tripData.members.join(", ")}
          </div>
        </div>
        <div className="trip-content">
          <div className="trip-map">
            <MapContainer
              center={position}
              zoom={8}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {tripData.locations.map((location, index) => {
                // const key = `${location.latitude}-${location.longitude}`;
                // console.log("location:", location);
                // console.log("latitude", location.latitude);
                // console.log("longitude", location.longitude);
                return (
                  <Marker
                    key={index}
                    position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                    icon={numberedIcon(index + 1)}
                    eventHandlers={{
                      click: () => {
                        setActiveLocation(index);
                      },
                    }}
                  >
                    <Popup>{location.location}</Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <div className="trip-info">
            {tripData.locations.map((location, index) => (
              <Location index={index} location={location} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;

