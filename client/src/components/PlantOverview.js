import React from 'react';
import { useState, useEffect } from 'react';

function PlantOverview({ plantnumber }) {

  const [plant, setPlant] = useState({});

  useEffect(() => {
    fetchPlant(plantnumber);
  })

  const fetchPlant = (number) => {
    fetch('/api/plants/' + number)
    .then(res => res.json())
    .then(plant => {
      setPlant(plant)
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <div className='plant-attr'>
      <h3>{plant.name} ( {plant.number} )</h3>

    </div>
  );

}

export default PlantOverview;
