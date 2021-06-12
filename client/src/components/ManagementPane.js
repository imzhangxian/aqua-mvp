import React, {useState} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import Plants from './Plants'
import Facilities from './Facilities'
import Equipments from './Equipments'

import { useTranslation } from 'react-i18next';

import './css/manage.css'

function ManagementPane() {
  const [key, setKey] = useState('plants');
  const { t } = useTranslation();

  return (
    <div className="management-tab">
    <Tabs
      id="management-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="plants" title={t('Tab plants')}>
        <Plants />
      </Tab>
      <Tab eventKey="facilities" title={t('Tab facilities')}>
        <Facilities />
      </Tab>
      <Tab eventKey="equipments" title={t('Tab equipments')}>
        <Equipments />
      </Tab>
    </Tabs>
    </div>
  );
}

export default ManagementPane
