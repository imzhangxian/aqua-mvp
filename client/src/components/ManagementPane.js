import React, {useState} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import Plants from './Plants'
import Facilities from './Facilities'
import Equipments from './Equipments'

import './css/manage.css'

function ManagementPane() {
  const [key, setKey] = useState('plants');

  return (
    <div className="management-tab">
    <Tabs
      id="management-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="plants" title="Plants">
        <Plants />
      </Tab>
      <Tab eventKey="facilities" title="Facilities">
        <Facilities />
      </Tab>
      <Tab eventKey="equipments" title="Equipments">
        <Equipments />
      </Tab>
    </Tabs>
    </div>
  );
}

export default ManagementPane
