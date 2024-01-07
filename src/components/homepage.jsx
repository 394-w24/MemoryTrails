import React from 'react';
import Trip from "./TripCard.jsx"
import Banner from "./Banner.jsx"
import MapPage from "./MapPage.jsx"

// const Banner = ({ title }) => (
//   <h1>{ title }</h1>
// );

// const mainpage = {
//   "title": 'memoryTrail'
// };

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


const HomePage = () =>  {
  return (
  <div >
    <Banner />
    <MapPage />
    <Trip trip = {firstTrip}/>
  </div>
);
};

export default HomePage;