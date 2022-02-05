import React from 'react';
import './App.css';
import SatelliteList from './SatelliteList.js';

function App() {
  return (
    <div>
      <div className="title"><h1>All satellite launches!</h1></div>
      <SatelliteList />
    </div>
  )
}

export default App;
