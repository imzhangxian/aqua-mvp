import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

import './css/manage.css'

function Plants() {
  const [showModal, setShowModal] = useState(false);
  const [plants, setPlants] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    savePlant({
      number: inputs.number,
      name: inputs.name,
      address: inputs.address, 
      location: {
        latitude: 31.3306,
        longitude: 119.9832
      }, 
      stages: inputs.stages,
      status: "Halt"
    });
  }

  const handleDelete = (id => {
    setLoading(true);
    fetch(`/api/plants/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  });


  const savePlant = (plant) => {
    setLoading(true);
    const createPlantReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: plant.number,
        name: plant.name,
        address: plant.address,
        latitude: plant.location.latitude, 
        longitude: plant.location.longitude, 
        stages: plant.stages
      })
    };
    fetch('/api/plants/', createPlantReq)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const getPlants = () => {
    fetch('/api/plants/')
      .then(res => res.json())
      .then(plants => {
        setPlants(plants);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getPlants();
  }, [loading]);

  return (
    <div className="plants-table">
      <Button className="add-plant-ops" onClick={handleShow}>Add</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="create-plant-number">
            <Form.Label>Number</Form.Label>
            <Form.Control type="text" placeholder="Enter plant number" 
              onChange={e => { inputs.number = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter plant name" 
              onChange={e => { inputs.name = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" 
              onChange={e => { inputs.address = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" defaultValue={31.3306} placeholder="Latitude" 
              onChange={e => { inputs.latitude = e.target.value }} />
            <Form.Control type="text" defaultValue={119.9832} placeholder="Longitude" 
              onChange={e => { inputs.longitude = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-stages">
            <Form.Label>Stages</Form.Label>
            <Form.Control as="select" multiple onChange={e => {
                let stages = [].slice.call(e.target.selectedOptions).map(item => item.value);
                inputs.stages = stages;
              }}>
              <option value="Pre-Treatment">Pre-Treatment</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
              <option value="Fourth">Fourth</option>
            </Form.Control>
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
            <th>Stages</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant._id}>
              <td>{plant.number}</td>
              <td>{plant.name}</td>
              <td>{plant.stages.map(stage => (`${stage.type} / `))}</td>
              <td>{plant.status}</td>
              <td><Button variant="danger" onClick={
                () => {
                  if (window.confirm(`Sure to DELETE ${plant.name}?`)) {
                    handleDelete(plant._id);
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

export default Plants
