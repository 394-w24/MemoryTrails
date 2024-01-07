import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Homepage} from "./components/Homepage";

const App = ()  => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;