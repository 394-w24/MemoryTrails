import React from 'react';
import './TripPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// used the firstTrip from App.jsx as an example
const firstTrip = {
    "name": "Wisconsin",
    "members" :[], 
    "locations": [
      {
        "location": "Madison", 
        "date": "July 5, 2024", 
        "lat": 43.07389,
        "lng": -89.40056,
        "photos": [
          "https://images.inc.com/uploaded_files/image/1920x1080/getty_483517958_368760.jpg"
        ], 
        "caption": "I love Madison"
      },
      {
        "location": "Milwaukee", 
        "date": "July 6, 2024", 
        "lat": 43.039,
        "lng": -87.906,
        "photos": [
          "" // need image
        ], 
        "caption": "I love Milwaukee"
      },
      {
        "location": "Eau Claire", 
        "date": "July 7, 2024", 
        "lat": 44.81667,
        "lng": -91.50000,
        "photos": [
          "" // need image
        ], 
        "caption": "I love Eau Claire"
      }
    ]
  };

const TripPage = () => {
  return (
    <div className="trip-page">
      <header className="trip-header">
        <h1>{firstTrip.name}</h1>
        <nav>
          <a href="/">Homepage</a>
        </nav>
      </header>
      <main className="trip-main">
      
      <section className="trip-map">
        <MapContainer center={[43.7844, -88.7879]} zoom={7} style={{ height: "100%", width: "100%" }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {firstTrip.locations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                    {location.location}
                </Popup>
            </Marker>
        ))}
        </MapContainer>
        </section>
        {/* This iterates over trips and displays them with additional info */}
        <section className="trip-details">
            {firstTrip.locations.map((location, index) => (
                <article key={index} className="trip-entry">
                    <h2>{location.location} - {location.date}</h2>
                    <p>{location.caption}</p>
                    <img className = "trip-image" src={location.photos[0]} alt={location.location} />
                </article>
            ))}
        </section>
      </main>
    </div>
  );
};

export default TripPage;