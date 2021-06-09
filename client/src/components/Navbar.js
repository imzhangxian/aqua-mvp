import React, { useState, useEffect, useRef } from "react"
import './css/Navbar.css'
import navMenu from './MenuItems.js'

import { useTranslation } from 'react-i18next';

function Navbar() {

    const [sidebar, setSidebar] = useState(false);

    const { t, i18n } = useTranslation();

    const showSidebar = () => {
        setSidebar(! sidebar);
    }

    const leftdrawer = useRef();
    const togglebutton = useRef();

    useEffect(() => {
      // add when mounted
      document.addEventListener("mousedown", handleClick);
      // return function to be called when unmounted
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);

    const handleClick = e => {
      if (leftdrawer.current.contains(e.target) || togglebutton.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click 
      setSidebar(false);
    };

    return (
      <>
      <nav className="nav navbar-dark bg-dark nav-header">
        <button ref={togglebutton} className="navbar-toggler" type="button" onClick={showSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1">{t('Nav title')}</span>
      </nav>
      <div ref={leftdrawer} className={sidebar ? 'left-drawer active' : 'left-drawer'}>
        <ul className="nav nav-pills nav-fill">
        {navMenu.map(item => (
          <li className="nav-item">
          <a className="nav-link" href={item.menuLink}><item.iconComponent /> {t(item.menuName)}</a>
        </li>
        ))}
        </ul>
      </div>
      </>
    );
}

export default Navbar;