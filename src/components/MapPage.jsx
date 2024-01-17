import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Trip from "./TripCard.jsx";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDbData } from "../utilities/firebase.js";


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

  const tripData = useDbData("trips/");

  console.log("trips object")
  console.log(tripData)
  if(tripData[0] === undefined) {
    return (<div></div>)
  }

  const tripArray = Object.values(tripData[0])
  console.log("trips array")
  console.log(tripArray)

  return (
    <div>
      <MapContainer
        center={[tripArray[0].locations[0].latitude, tripArray[0].locations[0].longitude]}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tripArray.map( (demoTrip) =>
          <Marker position={[demoTrip.locations[0].latitude, demoTrip.locations[0].longitude]} icon={customIcon}>
            <Popup>
              <Trip trip={demoTrip}/>
            </Popup>
          </Marker>

        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
