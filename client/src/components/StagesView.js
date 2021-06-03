import React from 'react';
import { useState, useEffect } from 'react';
import './css/StagesView.css'

function StagesView() {

  const [stages, setStages] = useState([]);

  useEffect(() => {
    fetchStages("P01");
  }, []);

  const fetchStages = (number) => {
    // console.log(`fetch stage for plant ${number}`);
    fetch('/api/plants/' + number + '/stages')
    .then(res => res.json())
    .then(stages => {
      setStages(stages);
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
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
                {Object.keys(stage.influent).map(key => (<li>{key} : {stage.influent[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail processing">
              存量：
              <ul>
              {Object.keys(stage.processing).map(key => (<li>{key} : {stage.processing[key]}</li>))}
              </ul>
            </div>
            <div className="stage-detail effluent">
              出水： 
              <ul>
              {Object.keys(stage.effluent).map(key => (<li>{key} : {stage.effluent[key]}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );

}

export default StagesView;
