import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import TripPage from "./components/TripPage.jsx"
import Banner from './components/Banner.jsx';
import AutoComplete from './components/LocationPicker.jsx';

const App = ()  => {
  return (
    // <BrowserRouter>
    // <Banner />
    //   <Routes>
    //     <Route path="/" element={<HomePage />}/>
    //     <Route path="/trip/:tripId" element={<TripPage /> } />
    //   </Routes>
    // </BrowserRouter>
    <AutoComplete/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;