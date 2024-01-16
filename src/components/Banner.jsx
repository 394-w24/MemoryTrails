import React from 'react';
import './Banner.css'; 
import { Link } from 'react-router-dom';
import Upload from './Upload';


const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <img src="https://www.kindpng.com/picc/m/200-2004455_travel-icon-png-transparent-png.png" alt="Travel Icon" className="logo" />
        <span className="title">MemoryTrails</span>
        <Link to={"/"} className='link-style' >
              Homepage
        </Link>
      </div>

      <div className='banner-right'>
        <Upload />
      </div>
    </div>
  );
};

export default Banner;
