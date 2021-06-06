import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Card } from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'mapbox-gl/dist/mapbox-gl.css'

import './App.css';

import Navbar from './components/Navbar';
import MonitorMap from './components/MonitorMap';
import PlantDetails from './components/PlantDetails';
import ManagementPane from './components/ManagementPane';
import About from './components/About'
import ComingSoon from "./components/ComingSoon";

import LineChart from "./components/reports/LineChart";
import PieChart from "./components/reports/PieChart";
import VerticalBar from "./components/reports/VerticalBar";
import ScatterChart from "./components/reports/ScatterChart";

import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/about">
            <div className="main-pane home-about">
                <About />
            </div>
          </Route>
          <Route path="/plants/:number">
            <div className="description-pane">
              <PlantDetails />
            </div>
          </Route>
          <Route path="/plants">
            <div className="description-pane">
              <PlantDetails />
            </div>
          </Route>
          <Route path="/reports">
            <div className="main-pane reports-pane">
                <LineChart />
                <PieChart />
                <VerticalBar />
                <ScatterChart />
            </div>
          </Route>
          <Route path="/manage">
            <div className="main-pane manage-pane">
              <ManagementPane />
            </div>
          </Route>
          <Route path="/bigdata">
            <div className="main-pane home-blockchain">
                <ComingSoon />
            </div>
          </Route>
          <Route path="/blockchain">
            <div className="main-pane home-about">
                <ComingSoon />
            </div>
          </Route>
          <Route path="/">
            <MonitorMap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
