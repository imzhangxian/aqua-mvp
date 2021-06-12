import React, { useState, useEffect, useContext } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

import './css/manage.css'
import { useTranslation } from 'react-i18next';

function Equipments() {
  const [showModal, setShowModal] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [inputs] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    setShowModal(false);
    saveEquipment({
      number: inputs.number,
      name: inputs.name,
      category: inputs.category,
      type: inputs.type,
      subtype: inputs.subtype,
      model: inputs.model,
      facility: inputs.facility,
      function: inputs.function
    });
  }

  const handleDelete = (id => {
    setLoading(true);
    fetch(`/api/equipments/${id}`, {
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

  const saveEquipment = (equip) => {
    setLoading(true);
    const createEquipReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(equip)
    };
    fetch('/api/equipments/', createEquipReq)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    fetch('/api/equipments/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => res.json())
      .then(equipments => {
        setEquipments(equipments);
      })
      .catch(e => {
        console.log(e);
      });
  }, [user, loading]);

  return (
    <div className="aqua-item-list">
      <Button className="aqua-item-add-btn" onClick={handleShow}>{t('btn.add')}</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('modal.createEquipment')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="create-equip-number">
            <Form.Label>{t('label.number')}</Form.Label>
            <Form.Control type="text" placeholder="Enter equipment number"
              onChange={e => { inputs.number = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-name">
            <Form.Label>{t('label.name')}</Form.Label>
            <Form.Control type="text" placeholder="Enter equipment name"
              onChange={e => { inputs.name = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-category">
            <Form.Label>{t('label.category')}</Form.Label>
            <Form.Control type="text" placeholder="<Machine | Meter>"
              onChange={e => { inputs.category = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-type">
            <Form.Label>{t('label.type')}</Form.Label>
            <Form.Control type="text" placeholder="<Flow gauge | COD | BOD | ... >"
              onChange={e => { inputs.type = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-subtype">
            <Form.Label>{t('label.subtype')}</Form.Label>
            <Form.Control type="text" placeholder="<Mechanic | Electronic | ... >"
              onChange={e => { inputs.subtype = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-model">
            <Form.Label>{t('label.model')}</Form.Label>
            <Form.Control type="text" placeholder="Manufacturer Model Name"
              onChange={e => { inputs.model = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-function">
            <Form.Label>{t('label.function')}</Form.Label>
            <Form.Control type="text" placeholder="<Functionality of the equipment>"
              onChange={e => { inputs.function = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="create-equip-name">
            <Form.Label>{t('label.assctFacility')}</Form.Label>
            <Form.Control type="text" placeholder="<e.g. P01FC01 >"
              onChange={e => { inputs.facility = e.target.value }} />
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
            <th>{t('label.category')}</th>
            <th>{t('label.type')}</th>
            <th>{t('label.function')}</th>
            <th>{t('label.status')}</th>
            <th>{t('label.operations')}</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map(equip => (
            <tr key={equip._id}>
              <td>{equip.number}</td>
              <td>{equip.name}</td>
              <td>{equip.category}</td>
              <td>{equip.type}</td>
              <td>{equip.function}</td>
              <td>{equip.status}</td>
              <td><Button className="aqua-item-ops-btn" variant="danger" onClick={
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
