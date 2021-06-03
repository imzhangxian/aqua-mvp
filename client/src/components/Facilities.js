import React, { useState, useEffect, useCallback } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

import './css/manage.css'

function Facilities() {
  const [showModal, setShowModal] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedStage, setSelectedStage] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    /** save facility */
    console.log(`Preparing to insert - Number: ${inputs.number}, name: ${inputs.name}, plant: ${selectedPlant}, stage: ${selectedStage}`);
    saveFacility({
      number: inputs.number,
      name: inputs.name,
      plant: selectedPlant,
      stage: selectedStage
    });
  }

  const handleDelete = (id => {
    setLoading(true);
    fetch(`/api/facilities/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  });

  const saveFacility = (facility) => {
    console.log(`Saving facility ... ${facility}`);
    setLoading(true);
    const createFacilityReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: facility.number,
        name: facility.name, 
        plant: facility.plant,
        stage: facility.stage
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
    <div className="aqua-item-list">
      <Button className="aqua-item-add-btn" onClick={handleShow}>Add</Button>
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
          <PlantSelector selectedPlant={selectedPlant} onPlantChange={setSelectedPlant} />
          <StageSelector selectedPlant={selectedPlant} 
            selectedStage={selectedStage} onStageChange={setSelectedStage} />
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
              <td>{facility.status}</td>
              <td><Button className="aqua-item-ops-btn" variant="danger" onClick={
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

function PlantSelector({ selectedPlant, onPlantChange}) {
  const [plants, setPlants] = useState([]);
  
  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = () => {
    fetch('/api/plants/')
      .then(res => res.json())
      .then(plants => {
        setPlants(plants);
      })
      .catch(e => {
        console.log(e);
      });
    
  }

  const handleInputChange = useCallback(event => {
    onPlantChange(event.target.value)
  }, [onPlantChange])

  return (
    <Form.Group controlId="create-facility-plants">
      <Form.Label>Plants</Form.Label>
      <Form.Control as="select" onChange={handleInputChange} value={selectedPlant}>
        {plants.map(plant => (
          <option value={plant.number}>{`${plant.number} - ${plant.name}`}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

function StageSelector({selectedPlant, selectedStage, onStageChange }) {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    fetchStages(selectedPlant);
  }, []);

  const fetchStages = (selectedPlant) => {
    if (selectedPlant) {
      fetch('/api/plants/' + selectedPlant + '/stages')
        .then(res => res.json())
        .then(stages => {
          setStages(stages);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  const handleInputChange = useCallback(event => {
    onStageChange(event.target.value)
  }, [onStageChange])

  return (
    <Form.Group controlId="create-facility-plants">
      <Form.Label>Stages</Form.Label>
      <Form.Control as="select" value={selectedStage} onChange={handleInputChange}>
        {stages.map(stage => (
          <option value={stage.type}>{`${stage.sequence} - ${stage.name}`}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default Facilities
