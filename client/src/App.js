import React from "react";
// import AppNavbar from './components/AppNavbar';
// import MeterList from './components/MeterList'
import MetersListPlain from './components/MetersListPlain';
import MonitorMap from './components/MonitorMap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <div className="App">
      <MonitorMap />
      <MetersListPlain />
    </div>
  );
}

export default App;
