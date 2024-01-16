//usage: "<NominatimGeocode locationName="Madison, Wisconsin" />"
import React, { useState, useEffect } from 'react';
import { getCoordinatesForLocation } from '../utilities/geocodeUtils'; // Import the function

const LocationComponent = ({ locationName }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await getCoordinatesForLocation(locationName);
        setCoordinates(coords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [locationName]);

  return (
    <div>
      <h4>Coordinates for {locationName}</h4>
      <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lon}</p>
    </div>
  );
};

export default LocationComponent;
