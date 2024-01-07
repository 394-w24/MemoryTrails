import React from 'react';

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
  
  const Trip = ({trip}) => (
    <div className="card" style={{width: '18rem'}} onClick={console.log("clicked")}>
      <img src={trip.locations[0].photos[0]} className="card-img-top" alt="The first photo"/>
      <div className="card-body">
        <div className = "card-title">{trip.name}</div>
        <div className = "card-footer"> start date: {trip.locations[0].date}, trip duration: {trip.duration} days </div>
      </div>
    </div>
  );

  export default Trip;