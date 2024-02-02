import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { writeToDb, getDbData } from "../utilities/firebase";
import { uploadFileToFirebase} from "../utilities/firebaseStorage"
// import { getCoordinatesForLocation } from '../utilities/geocodeUtils';
import AutoComplete from './LocationPicker';
import { v4 as uuidv4 } from 'uuid';
<<<<<<< HEAD
import './Upload.css'; 
=======
import Alert from 'react-bootstrap/Alert';
import "./Upload.css"
>>>>>>> 0ed3de0 (Added confirmation message for successful/unsuccessful trip upload)


const Upload = () => {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [locations, setLocations] = useState([{ location: '', photos: [], caption: '' }]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowAlert = () => setShowAlert(true);
    const handleAlertVariant = (variant) => setAlertVariant(variant);
    const handleAlertMessage = (message) => setAlertMessage(message);
    const [submitStatus, setSubmitStatus] = useState(null);

    const addLocation = () => {
        setLocations([...locations, { location: '', photos: [], caption: '' }]);
    };

    const removeLocation = (indexToRemove) => {
        setLocations(locations.filter((_, index) => index !== indexToRemove));
    };

    const handleLocationSelect = (index, address, coordinates) => {
        console.log(`Location selected at index ${index}:`, address, coordinates); // Log for debugging
        const updatedLocations = locations.map((location, locIndex) => {
            if (index === locIndex) {
                return { ...location, location: address, coordinates };
            }
            return location;
        });
        setLocations(updatedLocations);
        console.log("Updated locations:", updatedLocations); // Log for debugging
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        handleLocationSelect()
        //get a uniq id for each trip,
        const uniqueId = uuidv4();

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
        const processedLocations = locations.map(async (location, index) => {
            console.log("location", location);
            const locationName = formDataObj[`tripLocation_${index}`];
            const caption = formDataObj[`tripPhotoCaption_${index}`];
            const { lat, lng } = location.coordinates || {};

            // const coordinates = await getCoordinatesForLocation(locationName);
            console.log(`lat:`, lat);
            console.log(`lng:`, lng);
            let photoUrls = [];

            // Retrieve the file input for the current index
            const fileInput = formData.get(`tripPhotos_${index}`);
            console.log("file:", fileInput)

            if (fileInput) {
                const locationNameParse = location.location.split(',')[0];
                const fileUrl = await uploadFileToFirebase(fileInput, locationNameParse, uniqueId);
                photoUrls.push(fileUrl);
            }
            console.log(`Processed location ${index}:`, location);
            console.log("photo url:",photoUrls)
            return {
                location: location.location,
                latitude: lat,
                longitude: lng,
                caption: caption,
                date: formDataObj.tripStartDate,
                photos: photoUrls
            };

        });

        const tripData = {
            name: formDataObj.tripName,
            members: formDataObj.tripMembers.split(',').map(member => member.trim()),
            locations: await Promise.all(processedLocations),
            id: uniqueId
        };
        console.log(tripData)
        var success = await writeToDb(`trips/${newTripNumber}`, tripData);
        if (success) {
            console.log("Successfully upload trip info")
            handleAlertMessage("Successfully upload trip info")
            handleAlertVariant("success")
        } else {
            console.log("Failed to upload trip info")
            handleAlertMessage("Failed to upload trip info")
            handleAlertVariant("danger")
        }
        handleShowAlert(true);
        console.log("status:" + success);
        handleClose();
        setSubmitStatus('Trip added successfully!');
    };

    return (
    <div className="upload-body">
        <Button variant="primary" onClick={handleShow} className="upload-button">
        <span className="upload-button-word">Add Trip</span>
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
                                {/* <Form.Control type="text" name={`tripLocation_${index}`} /> */}
                                <AutoComplete
                                    index={index}
                                    onLocationSelect={handleLocationSelect}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Choose an image for the location</Form.Label>
                                <input className="form-control" type="file" name={`tripPhotos_${index}`} id={`formFileMultiple_${index}`}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Caption</Form.Label>
                                <Form.Control type="text" name={`tripPhotoCaption_${index}`} />
                            </Form.Group>
                            <hr/>
                            {locations.length > 1 && (
                                    <Button variant="danger" onClick={() => removeLocation(index)}>Remove Location</Button>
                                )}
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
        { showAlert && alertMessage.length > 0 && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className='upload-alert'>
            <p>{alertMessage}</p>
            </Alert>
        )}
    </div>
    )

}

export default Upload;