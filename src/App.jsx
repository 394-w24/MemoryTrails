import React from 'react';
import './App.css';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const mainpage = {
  "title": 'memoryTrail'
};

const Trip = ({ title, duration, location, id }) => (
  <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="..."/>
    <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
);

const App = () =>  (
  <div className="container">
    <Banner title={ mainpage.title } />
  </div>
);

export default App;