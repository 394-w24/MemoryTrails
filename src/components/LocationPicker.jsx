import { async } from '@firebase/util';
import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const AutoComplete = ({ index, onLocationSelect }) => {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });
    // const handleSelect = async value =>{
    //     const result = await geocodeByAddress(value);
    //     const ll = await getLatLng(result[0]);
    //     console.log("ll",ll);
    //     setAddress(value);
    //     setCoordinates(ll);
    //     onAddressSelect(value, ll);
    // }
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log("Selected LatLng:", latLng); // Log for debugging
        setAddress(value);
        onLocationSelect(index, value, latLng);
    };
    


    return (
        <div>
            {/* <p>lat:{coordinates.lat}</p>
            <p>long:{coordinates.lng}</p>
            <p> address:{address}</p> */}
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: 'Search Location ...',
                        className: 'form-control location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
            </div>
)}

export default AutoComplete;
 