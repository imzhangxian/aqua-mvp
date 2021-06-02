import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

import './css/manage.css'

function Equipments() {
  const [showModal, setShowModal] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    saveEquipment({
      number: inputs.number,
      name: inputs.name
    });
  }

  const handleDelete = (id => {
    setLoading(true);
    fetch(`/api/equipments/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  });

  const saveEquipment = (equip) => {
    setLoading(true);
    const createEquipReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: equip.number,
        name: equip.name
      })
    };
    fetch('/api/equipments/', createEquipReq)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const getEquipments = () => {
    fetch('/api/equipments/')
      .then(res => res.json())
      .then(equipments => {
        setEquipments(equipments);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getEquipments();
  }, [loading]);

  return (
    <div className="equipments-table">
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
          {equipments.map(equip => (
            <tr key={equip._id}>
              <td>{equip.number}</td>
              <td>{equip.name}</td>
              <td>{equip.stages.map(stage => (`${stage.type} / `))}</td>
              <td>{equip.status}</td>
              <td><Button variant="danger" onClick={
                () => {
                  if (window.confirm(`Sure to DELETE ${equip.name}`)) {
                    handleDelete(equip._id);
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

export default Equipments
