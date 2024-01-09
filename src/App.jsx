import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import TripPage from './TripPage';

const Banner = ({ title }) => (
  <div>
    <h1>{ title }</h1>
    <Link to="/trip">Go to Trip Page</Link>
  </div>
);

const mainpage = {
  "title": 'memoryTrail'
};

const Trip = ({trip}) => (
  <div className="card" style={{width: '18rem'}}>
    <img src={trip.locations[0].photos[0]} className="card-img-top" alt="The first photo"/>
    <div className="card-body">
      <title>{trip.name}</title>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner title={ mainpage.title } />} />
        <Route path="/trip" element={<TripPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;