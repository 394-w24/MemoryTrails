import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { writeToDb } from "../utilities/firebase";
import { getDbData } from "../utilities/firebase";


const Upload = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
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
    
        const tripData = {
            name: formDataObj.tripName,
            members: formDataObj.tripMembers.split(',').map(member => member.trim()),
            locations: [{
                location: formDataObj.tripLocation,
                caption: formDataObj.tripPhotoCaption,
                date: formDataObj.tripStartDate,
            }],
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
                <Form.Group className="mb-3" >
                <Form.Label>Location</Form.Label>
                <Form.Control type = "text" name="tripLocation"/>
                <div class="mb-3">
                    <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                    <input className="form-control" type="file" name = "tripPhotos" id="formFileMultiple" multiple />
                </div>
                <Form.Label>Caption</Form.Label>
                <Form.Control type = "text" name="tripPhotoCaption"/>
                </Form.Group>
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