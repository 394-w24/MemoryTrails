import React from 'react';
import './App.css';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const mainpage = {
  "title": 'memoryTrail'
};

const firstTrip = {
  "name": "Wisconsin",
  "members" :[], 
  "locations": [
    {
      "location": "Madison", 
      "date": " ", 
      "photos": [
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_483517958_368760.jpg"
      ], 
      "caption": "I love wisconsin"
    }
  ]
}

const Trip = ({trip}) => (
  <div className="card" style={{width: '18rem'}}>
    <img src={trip.locations[0].photos[0]} className="card-img-top" alt="The first photo"/>
    <div className="card-body">
      <title>{trip.name}</title>
    </div>
  </div>
);

const App = () =>  (
  <div className="container">
    <Banner title={ mainpage.title } />
    <Trip trip = {firstTrip}/>
  </div>
);

export default App;