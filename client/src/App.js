import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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
import LoginForm from "./components/LoginForm";

import LineChart from "./components/reports/LineChart";
import PieChart from "./components/reports/PieChart";
import VerticalBar from "./components/reports/VerticalBar";
import ScatterChart from "./components/reports/ScatterChart";

import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token') ? true : false);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login">
            <div className="main-pane">
                <LoginForm setLoggedIn={ setLoggedIn } />
            </div>
          </Route>
          <Route path="/about">
            <div className="main-pane home-about">
                <About />
            </div>
          </Route>
          {loggedIn ? <Route path="/plants/:number">
            <div className="description-pane">
              <PlantDetails />
            </div>
          </Route> : <Redirect to='/login' /> }
          <Route path="/plants">
          {loggedIn ? 
            <div className="description-pane">
              <PlantDetails />
            </div>
           : <Redirect to='/login' /> }
           </Route>
           <Route path="/reports">
          {loggedIn ? 
            <div className="main-pane reports-pane">
                <LineChart />
                <PieChart />
                <VerticalBar />
                <ScatterChart />
            </div>
           : <Redirect to='/login' /> }
           </Route>
           <Route path="/manage">
          {loggedIn ? 
            <div className="main-pane manage-pane">
              <ManagementPane />
            </div>
           : <Redirect to='/login' /> }
           </Route>
           <Route path="/bigdata">
          {loggedIn ? 
            <div className="main-pane home-blockchain">
                <ComingSoon />
            </div>
           : <Redirect to='/login' /> }
           </Route>
           <Route path="/blockchain">
          {loggedIn ? 
            <div className="main-pane home-about">
                <ComingSoon />
            </div>
           : <Redirect to='/login' /> }
           </Route>
           <Route path="/">
          {loggedIn ? 
            <MonitorMap />
           : <Redirect to='/login' /> }
           </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
