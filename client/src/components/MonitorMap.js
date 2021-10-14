import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import ReactMapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Marker, 
  GeolocateControl
} from 'react-map-gl';
import './css/MonitorMap.css'

import PulsatingDot from './PulsatingDot';
import MessagePanel from './MessagePanel'
import { AuthContext } from '../context/AuthContext'

function MonitorMap() {
  const [plants, setPlants] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 30.0956,
    longitude: 114.9799, // default location set to DaYe, Hubei
    zoom: 8
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const { user } = useContext(AuthContext);
  
  const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px'
  };

  const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px'
  };
  
  const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
  };
  
  const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
  };  

  useEffect(() => {
    fetch('/api/plants', { 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(res => res.json())
    .then(plants => {
      setPlants(plants)
    })
    .catch(e => {
      console.log(e);
    });
  }, [user]);

  return (
    <div className="main-map-container">
      <ReactMapGL
        {...viewport}
        width="100%" height="100%"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        // mapStyle='mapbox://styles/mapbox/light' 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {plants.map(plant => (
          <Marker
            key={plant._id} latitude={plant.location.latitude}
            longitude={plant.location.longitude}
            offsetLeft={-20} offsetTop={-10}>
            <PulsatingDot plant={plant} onClick={plant => setPopupInfo(plant)} />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.location.longitude}
            latitude={popupInfo.location.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <a href={`/plants/${popupInfo.number}`}>{popupInfo.name}</a>
          </Popup>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>

      <MessagePanel />
    </div>
  );
}

export default MonitorMap;