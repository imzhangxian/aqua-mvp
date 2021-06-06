import React, { useState, useEffect, useRef } from "react"
import { HiGlobe, HiViewList, HiChartPie, HiServer, HiInformationCircle } from 'react-icons/hi'
import './css/Navbar.css'

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
          <li className="nav-item">
            <a className="nav-link" href="/"><HiGlobe /> {t('Menu home')}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/plants"><HiViewList /> {t('Menu details')}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about"><HiInformationCircle /> {t('Menu about')}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reports"><HiChartPie /> {t('Menu reports')}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/manage"><HiServer /> {t('Menu manage')}</a>
          </li>
        </ul>
      </div>
      </>
    );
}

export default Navbar;