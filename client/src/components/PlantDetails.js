import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import './css/PlantDetails.css'

function PlantDetails() {

  const [plant, setPlant] = useState({});
  const [stages, setStages] = useState([]);

  let {number} = useParams();

  useEffect(() => {
    fetch('/api/plants/' + number)
    .then(res => res.json())
    .then(plant => {
      setPlant(plant);
      setStages(plant.stages);
    })
    .catch(e => {
      console.log(e);
    });
  }, [number]);

  /**
   * for all components rendering with fetched data:
   * first render will happen before data even fetched, so render will fail even before calling useEffect.
   * solution is to initialize with data that makes the render not to fail, or to check the empty data before rendering.
   */
  return (
    <>
    <div className='plant-attr'>
      <h3>{plant.name} ( {plant.number} )</h3>
    </div>
    <div className="accordion" id="devices">
      {stages.map(stage => (
        <div className="accordion-item" key={stage._id}>
        <h2 className="accordion-header" id={"heading" + stage._id}>
          <button className="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target={"#collapse" + stage._id}
            aria-expanded="false" aria-controls={"collapse" + stage._id}>
            {stage.name}
          </button>
        </h2>
        <div id={"collapse" + stage._id} className="accordion-collapse collapse"
          aria-labelledby={"heading" + stage._id} data-bs-parent="#devices">
          <div className="accordion-body stage-attrs">
            <div className="stage-detail influent">
              进水：
              <ul>
                {stage.influent && 
                Object.keys(stage.influent).map(key => (<li>{key} : {stage.influent[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail processing">
              存量：
              <ul>
              {stage.processing && 
              Object.keys(stage.processing).map(key => (<li>{key} : {stage.processing[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail effluent">
              出水：
              <ul>
              {stage.effluent && 
              Object.keys(stage.effluent).map(key => (<li>{key} : {stage.effluent[key]}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
    </>
  );

}

export default PlantDetails;
