import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Trip from "./Trip.jsx"


const MapPage = () => {
  const position = [43.0722, -89.4008];
  const firstTrip = {
    "name": "Wisconsin",
    "members" :[],
    "duration": 15, 
    "locations": [
      {
        "location": "Madison", 
        "date": "04/04/2023", 
        "photos": [
          "https://images.inc.com/uploaded_files/image/1920x1080/getty_483517958_368760.jpg"
        ], 
        "caption": "I love wisconsin"
      }
    ]
  }

  return (
    <div>
      <MapContainer center={position} zoom={14} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
        <Popup>
            <Trip trip={firstTrip} />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
