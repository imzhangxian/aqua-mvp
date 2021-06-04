import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function PlantOverview() {

  const [plant, setPlant] = useState({});

  let {number} = useParams();

  useEffect(() => {
    fetchPlant();
  })

  const fetchPlant = () => {
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
