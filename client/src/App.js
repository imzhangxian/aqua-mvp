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
import PlantOverview from './components/PlantOverview';
import StagesView from './components/StagesView';
import ManagementPane from './components/ManagementPane';
import LineChart from "./components/reports/LineChart";
import PieChart from "./components/reports/PieChart";
import VerticalBar from "./components/reports/VerticalBar";
import ScatterChart from "./components/reports/ScatterChart";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/about">
            <div className="main-pane home-about">
                <Card>
                  <Card.Body>Smart Water project.</Card.Body>
                </Card>
            </div>
          </Route>
          <Route path="/plants/:number">
            <div className="info-right">
              <PlantOverview />
              <StagesView />
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
          <Route path="/">
            <MonitorMap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
