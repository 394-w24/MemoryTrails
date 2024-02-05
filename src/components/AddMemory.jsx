import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AutoComplete from './LocationPicker';
import { uploadFileToFirebase } from "../utilities/firebaseStorage";
import { writeToDb } from "../utilities/firebase";

const AddMemory = ({ show, handleClose, tripId, tripData }) => {
  const [memoryFormData, setMemoryFormData] = useState({
    location: '',
    caption: '',
    photo: null
  });
  const [selectedCoordinates, setSelectedCoordinates] = useState({});

  const handleLocationSelect = (address, latLng) => {
    // console.log("Location selected:", address, latLng);
  
    setMemoryFormData(prevFormData => ({
      ...prevFormData,
      location: address
    }));
    setSelectedCoordinates(latLng);
  
    console.log("Updated memory form data:", memoryFormData);
  };  

  const handleMemoryFormChange = (e) => {
    const { name, value, files } = e.target;
    setMemoryFormData(prevFormData => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
  };

  const onMemorySubmit = async (e) => {
    e.preventDefault();

    // // Validate all necessary data is present
    // if (!memoryFormData.photo || !memoryFormData.location || !selectedCoordinates.lat || !selectedCoordinates.lng) {
    //   console.error('All form data must be provided.');
    //   return;
    // }

    try {
      const photoUrl = await uploadFileToFirebase(memoryFormData.photo, memoryFormData.location, tripId);
      const newMemory = {
        location: memoryFormData.location,
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng,
        caption: memoryFormData.caption,
        photos: [photoUrl] // Array of photo URLs
      };
      const updatedTripData = {
        ...tripData,
        locations: [...tripData.locations, newMemory]
      };
      await writeToDb(`trips/${tripId}`, updatedTripData);
      handleClose();
      setMemoryFormData({ location: '', caption: '', photo: null });
      setSelectedCoordinates({});
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Memories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onMemorySubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <AutoComplete
                onLocationSelect={(index, address, latLng) => {
                    console.log('Selected Address:', address);
                    console.log('Selected Coordinates:', latLng);
                    handleLocationSelect(address, latLng);
                }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              onChange={handleMemoryFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              name="caption"
              value={memoryFormData.caption}
              onChange={handleMemoryFormChange}
              placeholder="Enter a caption"
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Memory
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMemory;
