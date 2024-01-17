import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { writeToDb } from "../utilities/firebase";
import { getDbData } from "../utilities/firebase";
import { getCoordinatesForLocation } from '../utilities/geocodeUtils';


const Upload = () => {
    const [show, setShow] = useState(false);
    const [locations, setLocations] = useState([{ location: '', photos: [], caption: '' }]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addLocation = () => {
        setLocations([...locations, { location: '', photos: [], caption: '' }]);
    };

    
    const onFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
    
        const existingTrips = await getDbData('trips');
    
        let highestNumber = 0;
        if (existingTrips) {
            highestNumber = Object.keys(existingTrips)
                .map(key => parseInt(key.match(/\d+/), 10)) 
                .reduce((max, current) => Math.max(max, current), 0);
        }
    
        const newTripNumber = (highestNumber + 1).toString().padStart(2, '0'); 
        // Process each location
        const processedLocations = locations.map(async (location, index) => {
            const coordinates = await getCoordinatesForLocation(location.location);
            return {
                location: location.location,
                latitude: coordinates.lat,
                longitude: coordinates.lon,
                caption: location.caption,
                date: formDataObj.tripStartDate,
                photos: formDataObj[`tripPhotos_${index}`] // This assumes you handle file inputs separately
            };
        });

        const tripData = {
            name: formDataObj.tripName,
            members: formDataObj.tripMembers.split(',').map(member => member.trim()),
            locations: await Promise.all(processedLocations)
        };
        console.log(tripData)
    
        writeToDb(`trips/${newTripNumber}`, tripData);
    };
    
    return (
    <div>
        <Button variant="primary" onClick={handleShow}>
            Add Trip
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Trip:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                    type="text"
                    name = "tripName"
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Trip members:</Form.Label>
                <Form.Control type = "text"  name = "tripMembers"/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Trip Start Date:</Form.Label>
                <Form.Control type="text" name="tripStartDate"/>
                </Form.Group>
                <hr/>

                {locations.map((location, index) => (
                        <div key={index}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name={`tripLocation_${index}`} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <input className="form-control" type="file" name={`tripPhotos_${index}`} id={`formFileMultiple_${index}`} multiple />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Caption</Form.Label>
                                <Form.Control type="text" name={`tripPhotoCaption_${index}`} />
                            </Form.Group>
                        </div>
                    ))}

                <Button variant="secondary" onClick={addLocation}>
                    Add More Location
                </Button>
                <hr/>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" type='submit'>
                Upload Trip
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    </div>
    )

}

export default Upload;