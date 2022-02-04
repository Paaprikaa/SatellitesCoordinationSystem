import React from 'react';
import './App.css';
import SatelliteList from './SatelliteList.js';

function App() {
  return (
    <div>
      <h1 className="title">All satellite launches!</h1>
      <SatelliteList />
    </div>
  )
}

export default App;
