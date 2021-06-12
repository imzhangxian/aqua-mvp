import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

import './css/manage.css'

import { useTranslation } from 'react-i18next';

function Facilities() {
  const [showModal, setShowModal] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [ inputs ] = useState({});
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    /** save facility */
    saveFacility({
      number: inputs.number,
      name: inputs.name,
      plant: inputs.plant,
      stage: inputs.stage
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
      body: JSON.stringify(facility)
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
      <Button className="aqua-item-add-btn" onClick={handleShow}>{t('btn.add')}</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('modal.createFacility')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="create-facility-number">
            <Form.Label>{t('label.number')}</Form.Label>
            <Form.Control type="text" placeholder="Enter facility number"
              onChange={e => { inputs.number = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-facility-name">
            <Form.Label>{t('label.name')}</Form.Label>
            <Form.Control type="text" placeholder="Enter facility name"
              onChange={e => { inputs.name = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-facility-plant">
            <Form.Label>{t('label.plantNumber')}</Form.Label>
            <Form.Control type="text" placeholder="Enter plant number"
              onChange={e => { inputs.plant = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-facility-stage">
            <Form.Label>{t('label.stageType')}</Form.Label>
            <Form.Control type="text" placeholder="Enter facility stage"
              onChange={e => { inputs.stage = e.target.value }} />
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
            <th>{t('label.status')}</th>
            <th>{t('label.operations')}</th>
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

export default Facilities
