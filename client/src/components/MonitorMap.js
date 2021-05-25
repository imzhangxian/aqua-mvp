import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Bulleye from './Bulleye';

function MonitorMap() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 31.3306,
    longitude: 119.8253,
    zoom: 8
  });

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stations')
    .then(res => res.json())
    .then(stations => {
      setStations(stations)
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
    console.log(`Color level of ${warninglevel} is ${color}`)
    return color;
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiaW16aGFuZ3hpYW4iLCJhIjoiY2tvdmF6c3RiMDVyMTJ3cWtvaWxqMmZsaCJ9.XyGa3vTRqLs2ShNX3873og"
    >
      {stations.map(({_id, name, number, lat, longt, warninglevel}) => (
        <Marker key={_id} latitude={lat} longitude={longt} offsetLeft={-20} offsetTop={-10}>
          <Bulleye fill={calculateColor(warninglevel)} size={20} />
        </Marker>
     ))}
    </ReactMapGL>
  );
}

export default MonitorMap;