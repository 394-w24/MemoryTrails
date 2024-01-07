import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapPage = () => {
  const position = [42.0564594, -87.7133758];

  return (
    <div>
      <MapContainer center={position} zoom={14} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Northwestern University</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
