import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';

import './css/PlantDetails.css'

import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

function PlantDetails() {

  const [plant, setPlant] = useState(null);
  const [stages, setStages] = useState([]);
  const [plants, setPlants] = useState([]);
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  let {number} = useParams();

  useEffect(() => {
    if (number) {
      
      fetch('/api/plants/' + number, { 
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => res.json())
      .then(plant => {
        setPlant(plant);
        setStages(plant.stages);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }, [number, user]);
  
  useEffect(() => {
    fetch('/api/plants', { 
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
  }, [user]);

  const handleSelectionChange = e => {
    fetch('/api/plants/' + e.target.value, { 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(res => res.json())
    .then(plant => {
      setPlant(plant);
      setStages(plant.stages);
    })
    .catch(e => {
      console.log(e);
    });
}

  /**
   * for all components rendering with fetched data:
   * first render will happen before data even fetched, so render will fail even before calling useEffect.
   * solution is to initialize with data that makes the render not to fail, or to check the empty data before rendering.
   */
  return (
    <>
    {!number && (<>
    <select className="form-select" defaultValue="" aria-label="Default select example"
      onChange={handleSelectionChange}>
      <option value="">{t('title.selectPlants')}</option>
      {plants && plants.map(p => (
      <option key={p._id} value={p.number}>{p.name}</option>
      ))}
    </select>
    </>)}
    {plant && (
    <>
    <div className='plant-attr'>
      <h3>{plant.number} - {plant.name} </h3>
    </div>
    <div className="accordion" id="devices">
      {stages.map(stage => (
        <div className="accordion-item" key={stage._id}>
        <h2 className="accordion-header" id={"heading" + stage._id}>
          <button className="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target={"#collapse" + stage._id}
            aria-expanded="false" aria-controls={"collapse" + stage._id}>
            {t(stage.type)}
          </button>
        </h2>
        <div id={"collapse" + stage._id} className="accordion-collapse collapse"
          aria-labelledby={"heading" + stage._id} data-bs-parent="#devices">
          <div className="accordion-body stage-attrs">
            <div className="stage-detail influent">
            {t('label.influent')} : 
              <ul>
                {stage.influent && 
                Object.keys(stage.influent).map(key => (<li key={key}>{key} : {stage.influent[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail processing">
            {t('label.processing')} : 
              <ul>
              {stage.processing && 
              Object.keys(stage.processing).map(key => (<li key={key}>{key} : {stage.processing[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail effluent">
            {t('label.effluent')} : 
              <ul>
              {stage.effluent && 
              Object.keys(stage.effluent).map(key => (<li key={key}>{key} : {stage.effluent[key]}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
    </>
    )}
    </>
  );

}

export default PlantDetails;
