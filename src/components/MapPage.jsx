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
  const firstTrip = {
    name: "Wisconsin",
    members: [],
    duration: 15,
    locations: [
      {
        location: "Madison",
        latitude: 43.0722, 
        longitude: -89.4008, 
        date: "04/04/2023",
        photos: [
          "https://images.inc.com/uploaded_files/image/1920x1080/getty_483517958_368760.jpg",
        ],
        caption: "I love wisconsin",
      },
    ],
  };

  const demoTrips = [
    {
      "name": "South Dakota",
      "members" :[],
      "duration": 7, 
      "locations": [
        {
          "location": "Keystone", 
          "latitude" : 43.8803, 
          "longitude" : -103.4538,
          "date": "06/24/2023", 
          "photos": [
            "https://www.nps.gov/common/uploads/grid_builder/moru/crop16_9/C6C71E83-1DD8-B71B-0B3B2B02603AB440.jpg?width=640&quality=90&mode=crop"
          ], 
          "caption": "Mount Rushmore is so cool!"
        }
      ]
    } , 
    {
      "name": "Walt Disney World",
      "members" :[],
      "duration": 10, 
      "locations": [
        {
          "location": "Lake Buena Vista", 
          "latitude": 28.3772, 
          "longitude": -81.5707,
          "date": "11/20/2023", 
          "photos": [
            "https://img.money.com/2017/05/170515-walt-disney-world-cost.jpeg?crop=0px%2C279px%2C2700px%2C1519px&quality=85"
          ], 
          "caption": "I saw so many Disney characters at Disney World."
        }
      ]
    } , 
    {
      "name": "New York",
      "members" :[],
      "duration": 4, 
      "locations": [
        {
          "location": "New York City",
          "latitude": 40.7128, 
          "longitude": -74.0060,
          "date": "12/23/23", 
          "photos": [
            "https://www.tripsavvy.com/thmb/C55SxvFfoqLpb9IFL3rHLtvUn2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642333830-5bd6f58dc9e77c0058677fba.jpg"
          ], 
          "caption": "It was so cold when we went to Times Square."
        }
      ]
    } 
  ];



  return (
    <div>
      <MapContainer
        center={[firstTrip.locations[0].latitude, firstTrip.locations[0].longitude]}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[firstTrip.locations[0].latitude, firstTrip.locations[0].longitude]} icon={customIcon}>
          <Popup>
            <Trip trip={firstTrip} />
          </Popup>
        </Marker>
        {demoTrips.map( demoTrip => 
          <Marker position={[demoTrip.locations[0].latitude, demoTrip.locations[0].longitude]} icon={customIcon}>
            <Popup>
              <Trip trip={demoTrip} />
            </Popup>
          </Marker>

        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
