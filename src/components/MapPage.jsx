import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Trip from "./TripCard.jsx";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDbData } from "../utilities/firebase.js";
import Carousel from 'react-bootstrap/Carousel';
import "./TripCard.css";

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

  const locations = {}
  
  Object.entries(tripData[0]).map(([tripId, trip]) => {
    if (locations[trip.locations[0].latitude + ":" + trip.locations[0].longitude]){
      console.log(locations)
      locations[trip.locations[0].latitude + ":" + trip.locations[0].longitude].push({tripId, trip})
    }else{
      console.log(locations)
      locations[trip.locations[0].latitude + ":" + trip.locations[0].longitude] = [{tripId, trip}]
    }
  })

  //  // State to hold the current zoom level
  //  const [zoomLevel, setZoomLevel] = useState(4);

  //  // Function to update zoom level based on screen width
  //  const updateZoomLevel = () => {
  //    if (window.innerWidth <= 768) { // Example breakpoint for mobile devices
  //      setZoomLevel(3); // A zoom level more suitable for mobile
  //    } else {
  //      setZoomLevel(4); // Default zoom level for desktop
  //    }
  //  };

  //    // Effect hook to set zoom level on mount and when window resizes
  // useEffect(() => {
  //   updateZoomLevel(); // Set initial zoom
  //   window.addEventListener('resize', updateZoomLevel); // Adjust zoom on resize
    
  //   // Cleanup listener to avoid memory leaks
  //   return () => window.removeEventListener('resize', updateZoomLevel);
  // }, []);


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
        {Object.values(locations).map(tripList => (
          <Marker position={[tripList[0].trip.locations[0].latitude, tripList[0].trip.locations[0].longitude]} icon={customIcon}>
            <Popup>
              <Carousel>
                  {tripList.map(trip => (
                          <Carousel.Item>
                            <div className="card" style={{ width: '18rem' }}>
                              {/* <Trip key={trip.tripId} tripId={trip.tripId} trip={trip.trip} simpleView={true}/> */}
                                <img src={trip.trip.locations[0].photos[0]} className="card-img-top" alt="Trip photo"/>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <Link to={`/trip/${trip.tripId}`}>
                                    {trip.trip.name}
                                  </Link>
                                </div>
                              </div>
                          </Carousel.Item>
                  ))} 
                </Carousel>
              </Popup>
          </Marker> 
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;

