import React, { useState, useEffect, useContext } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

import './css/manage.css'
import { useTranslation } from 'react-i18next';

function Plants() {
  const [showModal, setShowModal] = useState(false);
  const [plants, setPlants] = useState([]);
  const [inputs] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    const facilityData = {
      number: inputs.number,
      name: inputs.name,
      address: inputs.address,
      latitude: inputs.latitude,
      longitude: inputs.longitude,
      stages: inputs.stages,
      status: "Ready"
    };
    if (validateFacilityData(facilityData)) {
      setShowModal(false);
      savePlant(facilityData);
    } else {
      // TODO highlight invalid data field
      window.alert('input data error')
    }
  }
  
  const validateFacilityData = (facilityData => {
    let result = true;
    // TODO: validate data
    return result;
  });

  const handleDelete = (id => {
    setLoading(true);
    fetch(`/api/plants/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
      })
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
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(plant)
    };
    fetch('/api/plants/', createPlantReq)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const getPlants = () => {
    fetch('/api/plants/', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => res.json())
      .then(plants => {
        setPlants(plants);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(getPlants, [user, loading]);

  return (
    <div className="aqua-item-list">
      <Button className="aqua-item-add-btn" onClick={handleShow}>{t('btn.add')}</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('modal.createPlant')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="create-plant-number">
            <Form.Label>{t('label.number')}</Form.Label>
            <Form.Control type="text" placeholder="Enter plant number"
              onChange={e => { inputs.number = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-name">
            <Form.Label>{t('label.name')}</Form.Label>
            <Form.Control type="text" placeholder="Enter plant name"
              onChange={e => { inputs.name = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-address">
            <Form.Label>{t('label.address')}</Form.Label>
            <Form.Control type="text" placeholder="Address"
              onChange={e => { inputs.address = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-Latitude">
            <Form.Label>{t('label.coordinate')}</Form.Label>
            <Form.Control type="text" placeholder="Latitude (-90~90), e.g. 31.3306"
              onChange={e => { inputs.latitude = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-Longitude">
            <Form.Control type="text" placeholder="Longitude (-180~180), e.g. 119.9832"
              onChange={e => { inputs.longitude = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-plant-stages">
            <Form.Label>{t('label.stages')}</Form.Label>
            <Form.Control as="select" multiple onChange={e => {
                let stages = [].slice.call(e.target.selectedOptions).map(item => item.value);
                inputs.stages = stages;
              }}>
              <option value="Pre-Treatment">{t('Pre-Treatment')}</option>
              <option value="Primary">{t('Primary')}</option>
              <option value="Secondary">{t('Secondary')}</option>
              <option value="Tertiary">{t('Tertiary')}</option>
              <option value="Fourth">{t('Fourth')}</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
          {t('btn.submit')}
        </Button>
          <Button variant="secondary" onClick={handleClose}>
          {t('btn.close')}
        </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('label.number')}</th>
            <th>{t('label.name')}</th>
            <th>{t('label.stages')}</th>
            <th>{t('label.status')}</th>
            <th>{t('label.operations')}</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant._id}>
              <td>{plant.number}</td>
              <td>{plant.name}</td>
              <td>{plant.stages.map(stage => (`${t(stage.type)} / `))}</td>
              <td>{plant.status}</td>
              <td><Button className="aqua-item-ops-btn" variant="danger" onClick={
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
