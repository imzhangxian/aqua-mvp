import React, { useState } from "react"
import './css/Navbar.css'

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(! sidebar);
    }

    return (
      <>
      <nav className="nav navbar-dark bg-dark nav-header">
        <button className="navbar-toggler" type="button" onClick={showSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1">Smart Water Integral</span>
      </nav>
      <div className={sidebar ? 'left-drawer active' : 'left-drawer'}>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/plants">Plants</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reports">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/manage">Manage</a>
          </li>
        </ul>
      </div>
      </>
    );
}

export default Navbar;