import React from 'react';
import './App.css';
import SatelliteList from './SatelliteList.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSatellite, faStar } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div>
      <div className="title">
        <h1> 
        SpaceX Satellite Launch Log
        </h1>
      </div>
      <SatelliteList />
    </div>
  )
}

export default App;
