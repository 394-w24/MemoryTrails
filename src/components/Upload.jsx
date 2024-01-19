import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { writeToDb, getDbData } from "../utilities/firebase";
import { uploadFileToFirebase} from "../utilities/firebaseStorage"
import { getCoordinatesForLocation } from '../utilities/geocodeUtils';
import AutoComplete from './LocationPicker';


const Upload = () => {
    const [show, setShow] = useState(false);
    const [locations, setLocations] = useState([{ location: '', photos: [], caption: '' }]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [submitStatus, setSubmitStatus] = useState(null);

    const addLocation = () => {
        setLocations([...locations, { location: '', photos: [], caption: '' }]);
    };

    
    const onFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        console.log("Form data retrieved:", formData);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log("Form data object:", formDataObj);
        
        const existingTrips = await getDbData('trips');
        console.log("Existing trips:", existingTrips); 
    
        let highestNumber = 0;
        if (existingTrips) {
            highestNumber = Object.keys(existingTrips)
                .map(key => parseInt(key.match(/\d+/), 10)) 
                .reduce((max, current) => Math.max(max, current), 0);
        }
    
        const newTripNumber = (highestNumber + 1).toString().padStart(2, '0'); 
        // Process each location
        const processedLocations = locations.map(async (_, index) => {
            const locationName = formDataObj[`tripLocation_${index}`];
            const caption = formDataObj[`tripPhotoCaption_${index}`];

            const coordinates = await getCoordinatesForLocation(locationName);
            console.log(`Coordinates:`, coordinates);
            let photoUrls = [];

            // Retrieve the file input for the current index
            const fileInput = formData.get(`tripPhotos_${index}`);
            console.log("file:", fileInput)
            if (fileInput) {
                const fileUrl = await uploadFileToFirebase(fileInput);
                photoUrls.push(fileUrl);
            }
            console.log(`Processed location ${index}:`, location);
            console.log("photo url:",photoUrls)
            return {
                location: locationName,
                latitude: coordinates.lat,
                longitude: coordinates.lon,
                caption: caption,
                date: formDataObj.tripStartDate,
                photos: photoUrls 
            };

        });

        const tripData = {
            name: formDataObj.tripName,
            members: formDataObj.tripMembers.split(',').map(member => member.trim()),
            locations: await Promise.all(processedLocations)
        };
        console.log(tripData)
    
        writeToDb(`trips/${newTripNumber}`, tripData);
        handleClose();
        setSubmitStatus('Trip added successfully!');
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
                    placeholder="e.g. Fun trip to Morocco!"
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Trip members:</Form.Label>
                <Form.Control type = "text"  name = "tripMembers" placeholder="e.g. Mike, Joel, Wyatt"/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Trip Start Date:</Form.Label>
                <Form.Control type="Date" name="tripStartDate"/>
                </Form.Group>
                <hr/>

                {locations.map((location, index) => (
                        <div key={index}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name={`tripLocation_${index}`} />
                                <AutoComplete />
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