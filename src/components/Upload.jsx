import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




const Upload = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormSubmit = e => {
        e.preventDefault()
        console.log(e.target)
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj) //form entries stored in formDataObj
    }
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