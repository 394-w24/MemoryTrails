import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Trip from "./TripCard.jsx";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


const customIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



const MapPage = () => {
  const position = [43.0722, -89.4008];
  const firstTrip = {
    name: "Wisconsin",
    members: [],
    duration: 15,
    locations: [
      {
        location: "Madison",
        date: "04/04/2023",
        photos: [
          "https://images.inc.com/uploaded_files/image/1920x1080/getty_483517958_368760.jpg",
        ],
        caption: "I love wisconsin",
      },
    ],
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <Trip trip={firstTrip} />
            <Link to={"/trip"} style={{ display: "block", marginTop: "10px" }}>
              View Trip
            </Link>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
