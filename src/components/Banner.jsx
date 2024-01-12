import React from 'react';
import { useState } from 'react';
import './Banner.css'; 
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const Banner = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
        <Button variant="primary" onClick={handleShow}>
          Add Trip
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Trip:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="trip_name"
                  placeholder="Your Trip's name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Trip members:</Form.Label>
                <Form.Control as="textarea" rows={1} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Trip date:</Form.Label>
                <Form.Control as="textarea" rows={1} />
              </Form.Group>
              <hr/>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Location</Form.Label>
                <Form.Control type = "location" as="textarea" rows={1} />
                <div class="mb-3">
                  <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                  <input class="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <Form.Label>Caption</Form.Label>
                <Form.Control type = "caption" as="textarea" rows={1} />
              </Form.Group>
              <hr/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Upload Trip
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Banner;
