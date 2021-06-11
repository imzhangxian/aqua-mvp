import React from 'react'
import  './css/PulsatingDot.css'

function PulsatingDot({ plant, onClick }) {

  // convert warning level to color (G -> R)
  const calculateColor = (warninglevel) => {
    let color = 'normal';
    if (warninglevel > 20 && warninglevel < 80) {
      color = 'warning';
    } else if (warninglevel >= 80) {
      color = 'severe';
    }
    return color;
  };

  let classname = "pulsatingDot";
  if (plant) {
    classname += ' ' + calculateColor(plant.warninglevel);
  }

  return (
    <div className={classname}>
      <div className="pin" onClick={() => onClick(plant)} />
    </div>
  );
}

export default PulsatingDot;
