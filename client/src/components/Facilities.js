import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

import './css/manage.css'

function Facilities() {
  const [showModal, setShowModal] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    /** save facility */
  }

  const handleDelete = (id => {
    /** delete facility */
  });


  const saveFacility = (facility) => {
    setLoading(true);
    const createFacilityReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: facility.number,
        name: facility.name
      })
    };
    fetch('/api/facilities/', createFacilityReq)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const getFacilities = () => {
    fetch('/api/facilities/')
      .then(res => res.json())
      .then(facilities => {
        setFacilities(facilities);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getFacilities();
  }, [loading]);

  return (
    <div className="Facilities-table">
      <Button className="add-facility-ops" onClick={handleShow}>Add</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="create-facility-number">
            <Form.Label>Number</Form.Label>
            <Form.Control type="text" placeholder="Enter facility number" 
              onChange={e => { inputs.number = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-facility-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter facility name" 
              onChange={e => { inputs.name = e.target.value }} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
            Submit
        </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            <tr key={facility._id}>
              <td>{facility.number}</td>
              <td>{facility.name}</td>
              <td>{facility.plant}</td>
              <td>{facility.status}</td>
              <td><Button variant="danger" onClick={
                () => {
                  if (window.confirm(`Sure to DELETE ${facility.name}?`)) {
                    handleDelete(facility._id);
                  }
                }
              }>-</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Facilities
