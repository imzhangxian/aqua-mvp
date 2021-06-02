import React from 'react';
import { useState, useEffect } from 'react';

function MetersListPlain() {

  const [meters, setMeters] = useState([]);

  useEffect(() => {
    fetchMeters();
  })

  const fetchMeters = () => {
    fetch('/api/meters')
    .then(res => res.json())
    .then(meters => {
      setMeters(meters)
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <div className="accordion" id="devices">
      {meters.map(({ _id, name, number }) => (
        <div className="accordion-item" key={_id}>
          <h2 className="accordion-header" id={"heading" + _id}>
            <button className="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target={"#collapse" + _id}
              aria-expanded="false" aria-controls={"collapse" + _id}>
              {name}
            </button>
          </h2>
          <div id={"collapse" + _id} className="accordion-collapse collapse"
            aria-labelledby={"heading" + _id} data-bs-parent="#devices">
            <div className="accordion-body">
              <strong>{number}</strong><a href={"/device/details/" + _id}>Details</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}

export default MetersListPlain;
