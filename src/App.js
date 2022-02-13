import React, { useState, useEffect } from 'react';
import './App.css';
import SatelliteList from './SatelliteList.js';

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
  );
}

export default App;
