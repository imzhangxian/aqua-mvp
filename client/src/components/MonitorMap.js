import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Bulleye from './Bulleye';
import './css/MonitorMap.css'

function MonitorMap() {
  const [plants, setPlants] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 31.3306,
    longitude: 119.8253,
    zoom: 8
  });  

  useEffect(() => {
    fetch('/api/plants')
    .then(res => res.json())
    .then(plants => {
      setPlants(plants)
    })
    .catch(e => {
      console.log(e);
    });
  })

  // convert warning level to color (G -> R)
  const calculateColor = (warninglevel) => {
    let red = Math.floor(0xFF * warninglevel / 100);
    let green = Math.floor(0xFF * (100 - warninglevel) / 100);
    let color = "#" + (red < 0x10 ? "0" : "") + red.toString(16) 
                + (green < 0x10 ? "0" : "") + green.toString(16) + "00";
    // console.log(`Color level of ${warninglevel} is ${color}`)
    return color;
  };

  return (
    <div className="main-map-container">
    <ReactMapGL
      {...viewport}
      width="100%" height="100%" 
      onViewportChange={nextViewport => setViewport(nextViewport)}
      // mapStyle='mapbox://styles/mapbox/light' 
      mapboxApiAccessToken="pk.eyJ1IjoiaW16aGFuZ3hpYW4iLCJhIjoiY2tvdmF6c3RiMDVyMTJ3cWtvaWxqMmZsaCJ9.XyGa3vTRqLs2ShNX3873og"
    >
      {plants.map(plant => (
        <Marker 
              key={plant._id} latitude={plant.location.latitude} 
              longitude={plant.location.longitude} 
              offsetLeft={-20} offsetTop={-10}>
          <Bulleye fill={calculateColor(20)} size={20} />
        </Marker>
     ))}
    </ReactMapGL>
    </div>
  );
}

export default MonitorMap;